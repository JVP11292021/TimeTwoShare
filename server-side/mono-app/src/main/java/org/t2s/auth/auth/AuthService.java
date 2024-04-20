package org.t2s.auth.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.t2s.auth.config.JwtService;
import org.t2s.auth.token.Token;
import org.t2s.auth.token.TokenRepo;
import org.t2s.auth.token.TokenType;
import org.t2s.auth.user.User;
import org.t2s.auth.user.UserRepo;
import org.t2s.product.ProductModel;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;
    private final TokenRepo tokenRepo;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        List<ProductModel> products = Optional.ofNullable(request.getProducts())
                .map(productDtos -> productDtos.stream()
                        .map(productDto -> ProductModel.builder()
                                .name(productDto.getName())
                                .price(productDto.getPrice())
                                .description(productDto.getDescription())
                                .imgUrl(productDto.getImgUrl())
                                .isLent(productDto.isLent())
                                .contract(productDto.getContract())
                                .reviews(productDto.getReviews())
                                .build())
                        .collect(Collectors.toList()))
                .orElse(Collections.emptyList());

        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(this.encoder.encode(request.getPassword()))
                .role(request.getRole())
                .products(products)
                .build();
        var savedUser = this.userRepo.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        log.info("Saved user: {}", savedUser);
        log.info("With access_token:{}, refresh_token:{}", jwtToken, refreshToken);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .state(AuthTokenState.VALID)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            var user = this.userRepo.findByEmail(request.getEmail())
                    .orElseThrow();
            var jwtToken = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);
            revokeAllUserTokens(user);
            saveUserToken(user, jwtToken);
            log.info("Authenticated user:{}, access_token:{}, refresh_token:{}", user.getId(), jwtToken, refreshToken);
            return AuthenticationResponse.builder()
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken)
                    .state(AuthTokenState.VALID)
                    .build();
        } catch (BadCredentialsException e) {
            return AuthenticationResponse.builder()
                    .accessToken("")
                    .refreshToken("")
                    .state(AuthTokenState.EXPIRED)
                    .build();
        }
    }

    public String getActiveAccessToken(String userEmail) {
        if (userRepo.findByEmail(userEmail).isPresent())
            return tokenRepo.findActiveAccessTokenByUserEmail(userEmail);
        return "Invalid";
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        this.tokenRepo.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = this.tokenRepo.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        this.tokenRepo.saveAll(validUserTokens);
    }

    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.userRepo.findByEmail(userEmail)
                    .orElseThrow();
            if (this.jwtService.isValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .state(AuthTokenState.VALID)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
                log.info("Tokens refreshed for user:{}", user.getId());
            }
        }
    }
}
