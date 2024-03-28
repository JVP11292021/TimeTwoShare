package org.t2s.auth.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RequiredArgsConstructor
@RestController
@RequestMapping("/t2s/v1/user/users")
@CrossOrigin("http://localhost:4200")
public class UserController {
    private final UserService service;

    @PatchMapping
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Principal connectedUser
    ) {
        this.service.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }
}
