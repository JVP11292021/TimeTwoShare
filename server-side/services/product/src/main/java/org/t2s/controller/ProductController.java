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
@RequestMapping("/t2s/v1/product/")
public class ProductController implements TControllerCRUD<Integer, ProductDto, ProductModel> {
	private final ProductService productService;
	@Override
	@PostMapping
	@ResponseStatus(HttpStatus.ACCEPTED)
	public int insertEntity(ProductDto productdto) {
		 return productService.insert(productdto);
	}
	@Override
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<ProductDto> getAllEntities() {
		 return productService.getAll();
	}
	@Override
	@DeleteMapping
	@ResponseStatus(HttpStatus.FOUND)
	public boolean removeEntityById(Integer id) {
		 return productService.removeById(id);
	}
	@Override
	@PutMapping
	@ResponseStatus(HttpStatus.OK)
	public boolean updateEntity(Integer id, ProductModel productmodel) {
		 return productService.update(id, productmodel);
	}
}
