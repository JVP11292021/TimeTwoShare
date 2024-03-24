package org.t2s.auth.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.t2s.auth.user.Role;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RegisterRequest {

    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Role role;

}
