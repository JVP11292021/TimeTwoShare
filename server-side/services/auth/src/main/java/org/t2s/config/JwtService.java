package org.t2s.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.jetbrains.annotations.Contract;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {


    @Value("${application.security.jwt.secret-key}")
    private String secretKey;
    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;
    @Value("${application.security.jwt.refresh-token.expiration}")
    private long refreshExpiration;

    public String extractUsername(String token) {
        return this.extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, @NotNull Function<Claims, T> claimsResolver) {
        final Claims claims = this.extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(@NotNull UserDetails userDetails) {
        return this.generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, @NotNull UserDetails userDetails) {
        return this.buildToken(extraClaims, userDetails, this.jwtExpiration);
    }

    public String generateRefreshToken(@NotNull UserDetails userDetails) {
        return this.buildToken(new HashMap<>(), userDetails, this.refreshExpiration);
    }

    private @NotNull String buildToken(
            @NotNull Map<String, Object> extraClaims,
            @NotNull UserDetails userDetails,
            long expiration
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(this.getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isValid(String token, @NotNull UserDetails userDetails) {
        final String username = this.extractUsername(token);
        return (username.equals(userDetails.getUsername())) && ! this.isExpired(token);
    }

    private boolean isExpired(String token) {
        return this.extractExpiration(token).before(new Date());
    }

    @Contract(pure = true)
    private @Nullable Date extractExpiration(String token) {
        return this.extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(this.getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private @NotNull Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(this.secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }


}
