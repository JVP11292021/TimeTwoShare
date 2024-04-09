package org.t2s.product.controller;

import org.t2s.product.*;
import org.t2s.product.service.*;
import lombok.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.restframework.web.core.templates.*;
import org.restframework.web.annotations.markers.*;
import java.util.*;

@CompilationComponent
@Data
@AllArgsConstructor
@RestController
@RequestMapping("/t2s/v1/product")
public class ProductController implements TControllerEntityResponseWildcard<Long, ProductDto, ProductModel> {
	private final ProductService productService;
	@Override
	@PostMapping
	public ResponseEntity<?> insertEntity(@RequestBody ProductDto productdto) {
		 return ResponseEntity.ok(productService.insert(productdto));
	}
	@Override
	@GetMapping
	public ResponseEntity<?> getAllEntities() {
		 return ResponseEntity.ok(productService.getAll());
	}
	@GetMapping(path="/{name}")
	public ResponseEntity<Boolean> isProductLent(@PathVariable("name") String name) {
		return ResponseEntity.ok(productService.isLent(name));
	}
	@Override
	@DeleteMapping(path="/{id}")
	public ResponseEntity<?> removeEntityById(@PathVariable("id") Long id) {
		 return ResponseEntity.ok(productService.removeById(id));
	}
	@Override
	@PutMapping(path="/{id}")
	public ResponseEntity<?> updateEntity(@PathVariable("id") Long id, @RequestBody ProductModel productmodel) {
		 return ResponseEntity.ok(productService.update(id, productmodel));
	}
}
