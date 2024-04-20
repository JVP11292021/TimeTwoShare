package org.t2s.auth;

import lombok.Data;
import org.restframework.web.annotations.markers.CompilationComponent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@CompilationComponent
@Data
@Component
public class TokenProperties {
    @Value("${application.security.jwt.secret-key}")
    private String secretKey;
    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;
    @Value("${application.security.jwt.refresh-token.expiration}")
    private long refreshExpiration;
}
