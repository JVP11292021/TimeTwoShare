package org.t2s.controller;

import org.t2s.*;
import org.t2s.service.*;
import lombok.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.restframework.web.core.templates.*;
import org.restframework.web.annotations.markers.*;
import java.util.*;

@UpdateComponent
@CompilationComponent
@Data
@AllArgsConstructor
@RestController
@RequestMapping("/t2s/v1/product/storage")
public class ProductController implements TControllerEntityResponseWildcard<Integer, ProductDto, ProductModel> {
	private final ProductService productService;
	@Override
	@PostMapping
	public ResponseEntity<?> insertEntity(ProductDto productdto) {
		 return ResponseEntity.ok(productService.insert(productdto));
	}
	@Override
	@GetMapping
	public ResponseEntity<?> getAllEntities() {
		 return ResponseEntity.ok(productService.getAll());
	}
	@Override
	@DeleteMapping
	public ResponseEntity<?> removeEntityById(Integer id) {
		 return ResponseEntity.ok(productService.removeById(id));
	}
	@Override
	@PutMapping
	public ResponseEntity<?> updateEntity(Integer id, ProductModel productmodel) {
		 return ResponseEntity.ok(productService.update(id, productmodel));
	}
}
