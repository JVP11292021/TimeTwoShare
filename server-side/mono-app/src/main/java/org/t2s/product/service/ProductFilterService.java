package org.t2s.product.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.t2s.auth.user.User;
import org.t2s.product.ProductDto;
import org.t2s.product.repository.ProductRepository;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductFilterService {

    private final ProductRepository productRepo;

    public List<ProductDto> getAllProductsWithReviews() {
        return productRepo.findAll()
                .stream()
                .filter(productModel -> !productModel.getReviews().isEmpty())
                .map(productModel -> ProductDto.builder()
                        .name(productModel.getName())
                        .price(productModel.getPrice())
                        .description(productModel.getDescription())
                        .imgUrl(productModel.getImgUrl())
                        .isLent(productModel.isLent())
                        .contract(productModel.getContract())
                        .reviews(productModel.getReviews())
                        .build())
                .collect(Collectors.toList());
    }

    public List<ProductDto> getAllProductsWithReviewsAndContract() {
        return productRepo.findAll().stream()
                .filter(productModel -> !productModel.getReviews().isEmpty())
                .filter(productModel -> productModel.getContract() != null)
                .map(productModel -> ProductDto.builder()
                        .name(productModel.getName())
                        .price(productModel.getPrice())
                        .description(productModel.getDescription())
                        .imgUrl(productModel.getImgUrl())
                        .isLent(productModel.isLent())
                        .contract(productModel.getContract())
                        .reviews(productModel.getReviews())
                        .build())
                .collect(Collectors.toList());
    }

    public List<ProductDto> getAllProductsWithContracts() {
        return productRepo.findAll()
                .stream()
                .filter(productModel -> productModel.getContract() != null) // Filter products with contracts
                .map(productModel -> ProductDto.builder()
                        .name(productModel.getName())
                        .price(productModel.getPrice())
                        .description(productModel.getDescription())
                        .imgUrl(productModel.getImgUrl())
                        .isLent(productModel.isLent())
                        .contract(productModel.getContract())
                        .reviews(productModel.getReviews())
                        .build())
                .collect(Collectors.toList());
    }

    public List<ProductDto> getAllOwnedProducts(Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        return user.getProducts()
                .stream()
                .map(productModel -> ProductDto.builder()
                        .name(productModel.getName())
                        .price(productModel.getPrice())
                        .description(productModel.getDescription())
                        .imgUrl(productModel.getImgUrl())
                        .isLent(productModel.isLent())
                        .contract(productModel.getContract())
                        .reviews(productModel.getReviews())
                        .build())
                .collect(Collectors.toList());
    }
}
