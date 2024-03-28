package org.t2s.auth.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/t2s/v1/auth")
@CrossOrigin("http://localhost:4200")
public class AuthenticationController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(this.authService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(this.authService.authenticate(request));
    }

    @GetMapping("/{email}")
    public ResponseEntity<String> getActiveAccessTokenByEmail(@PathVariable("email") String userEmail) {
        return ResponseEntity.ok(this.authService.getActiveAccessToken(userEmail));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        this.authService.refreshToken(request, response);
    }

}
