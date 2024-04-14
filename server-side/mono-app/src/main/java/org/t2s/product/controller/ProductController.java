package org.t2s.product.controller;

import org.t2s.contract.ContractDto;
import org.t2s.product.*;
import org.t2s.product.service.*;
import lombok.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.restframework.web.core.templates.*;
import org.restframework.web.annotations.markers.*;
import org.t2s.review.ReviewDto;

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
	public ResponseEntity<?> getByName(@PathVariable("name") String name) {
		return ResponseEntity.ok(productService.getByName(name));
	}
	@PatchMapping(path="/contract/{name}")
	public ResponseEntity<Boolean> updateContract(@PathVariable("name") String name, @RequestBody ContractDto contract) {
		return ResponseEntity.ok(productService.updateContract(name, contract));
	}
	@PatchMapping(path="/review/{name}")
	public ResponseEntity<Boolean> updateReview(@PathVariable("name") String name, @RequestBody ReviewDto review) {
		return ResponseEntity.ok(productService.updateReview(name, review));
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
