package org.t2s.auth.user;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.t2s.auth.token.TokenRepo;
import org.t2s.product.ProductModel;

import java.security.Principal;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder encoder;
    private final UserRepo repo;

    public void changePassword(@NotNull ChangePasswordRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        if (!this.encoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        user.setPassword(this.encoder.encode(request.getNewPassword()));
        this.repo.save(user);
    }

    public User getUserByEmail(String email) {
        return this.repo.findByEmail(email).orElse(null);
    }

    public void changeProducts(ChangeProductsRequest request, Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        if (!this.encoder.matches(request.getCurrentPassword(), user.getPassword()))
            throw new IllegalStateException("Wrong password");

        user.setProducts(request.getProducts()
                .stream()
                .map(productDto -> ProductModel.builder()
                        .name(productDto.getName())
                        .price(productDto.getPrice())
                        .description(productDto.getDescription())
                        .imgUrl(productDto.getImgUrl())
                        .isLent(productDto.isLent())
                        .contract(productDto.getContract())
                        .reviews(productDto.getReviews())
                        .build())
                .collect(Collectors.toList()));
        this.repo.save(user);
    }
}
