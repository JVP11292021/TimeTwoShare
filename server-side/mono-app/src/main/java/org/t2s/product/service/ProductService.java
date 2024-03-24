package org.t2s.product.service;

import org.t2s.product.*;
import org.t2s.product.repository.*;
import lombok.*;
import org.springframework.stereotype.Service;
import org.restframework.web.core.templates.*;
import org.restframework.web.annotations.markers.*;
import java.util.*;

@CompilationComponent
@Data
@AllArgsConstructor
@Service
public class ProductService implements TServiceCRUD<Long, ProductDto, ProductModel> {
	private final ProductRepository repository;
	@Override
	public int insert(ProductDto productdto) {
		 return 0;
	}
	@Override
	public List<ProductDto> getAll() {
		 return null;
	}
	@Override
	public boolean removeById(Long id) {
		 return false;
	}
	@Override
	public boolean update(Long id, ProductModel productmodel) {
		 return false;
	}
}
