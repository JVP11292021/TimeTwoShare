package org.t2s.auth.user;

import lombok.Data;
import org.t2s.product.ProductDto;

import java.util.List;

@Data
public class ChangeProductsRequest {
    private String currentPassword;
    private List<ProductDto> products;
}
