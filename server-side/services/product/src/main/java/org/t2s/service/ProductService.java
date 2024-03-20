package org.t2s.service;

import org.t2s.*;
import org.t2s.repository.*;
import lombok.*;
import org.springframework.stereotype.Service;
import org.restframework.web.core.templates.*;
import org.restframework.web.annotations.markers.*;
import java.util.*;

@CompilationComponent
@Data
@AllArgsConstructor
@Service
public class ProductService implements TServiceCRUD<Integer, ProductDto, ProductModel> {
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
	public boolean removeById(Integer id) {
		 return false;
	}
	@Override
	public boolean update(Integer id, ProductModel productmodel) {
		 return false;
	}
}
