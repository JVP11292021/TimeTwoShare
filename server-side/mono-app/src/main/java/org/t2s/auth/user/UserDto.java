package org.t2s.auth.user;

import lombok.Builder;
import lombok.Data;
import org.t2s.product.ProductDto;

import java.util.List;

@Data
@Builder
public class UserDto {
    private Integer id;
    private String firstname;
    private String lastname;
    private List<ProductDto> products;
}
