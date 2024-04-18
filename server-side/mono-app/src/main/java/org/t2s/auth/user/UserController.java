package org.t2s.auth.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.t2s.product.ProductDto;

import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/t2s/v1/user")
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

    @PatchMapping(path="/products")
    public ResponseEntity<?> changeProducts(
            @RequestBody ProductDto productDto,
            Principal connectedUser
    ) {
        this.service.changeProducts(productDto, connectedUser);
        return ResponseEntity.ok(1);
    }

    @GetMapping
    public ResponseEntity<List<?>> getAll() {
        return ResponseEntity.ok(this.service.getAllUsers());
    }

    @GetMapping(path="/{email}")
    public ResponseEntity<User> getUserByAccessToken(@PathVariable("email") String email) {
        return ResponseEntity.ok(this.service.getUserByEmail(email));
    }
}
