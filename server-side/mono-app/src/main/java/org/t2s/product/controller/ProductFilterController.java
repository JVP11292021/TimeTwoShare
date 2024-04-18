package org.t2s.product.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.restframework.web.annotations.markers.CompilationComponent;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.t2s.product.ProductDto;
import org.t2s.product.service.ProductFilterService;

import java.security.Principal;
import java.util.List;

@CompilationComponent
@Data
@AllArgsConstructor
@RestController
@RequestMapping("/t2s/v1/product/filter")
public class ProductFilterController {

    private final ProductFilterService filterService;

    @GetMapping(path="/owned")
    public ResponseEntity<List<ProductDto>> getAllOwnedUserProducts(Principal connectedUser) {
        return ResponseEntity.ok(this.filterService.getAllOwnedProducts(connectedUser));
    }

    @GetMapping(path="/reviews")
    public ResponseEntity<List<ProductDto>> getAllProductsWithReviews() {
        return ResponseEntity.ok(this.filterService.getAllProductsWithReviews());
    }

    @GetMapping(path="/contract")
    public ResponseEntity<List<ProductDto>> getAllProductsWithContracts() {
        return ResponseEntity.ok(this.filterService.getAllProductsWithContracts());
    }

    @GetMapping(path="/reviews-contract")
    public ResponseEntity<List<ProductDto>> getAllProductsWithReviewsAndContract() {
        return ResponseEntity.ok(this.filterService.getAllProductsWithReviewsAndContract());
    }

}
