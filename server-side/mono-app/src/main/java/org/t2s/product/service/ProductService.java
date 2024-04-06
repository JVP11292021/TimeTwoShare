package org.t2s.product.service;

import org.springframework.beans.BeanUtils;
import org.t2s.product.*;
import org.t2s.product.repository.*;
import lombok.*;
import org.springframework.stereotype.Service;
import org.restframework.web.core.templates.*;
import org.restframework.web.annotations.markers.*;
import java.util.*;
import java.util.stream.Collectors;

@CompilationComponent
@Data
@AllArgsConstructor
@Service
public class ProductService implements TServiceCRUD<Long, ProductDto, ProductModel> {
	private final ProductRepository repository;
	@Override
	public int insert(ProductDto productdto) {
		ProductModel model = ProductModel.builder()
				.description(productdto.getDescription())
				.isLent(productdto.isLent())
				.price(productdto.getPrice())
				.name(productdto.getName())
				.imgUrl(productdto.getImgUrl())
				.contract(productdto.getContract())
				.reviews(productdto.getReviews())
				.build();

		this.repository.save(model);
		return 1;
	}
	@Override
	public List<ProductDto> getAll() {
		 return this.repository
				 .findAll()
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
	@Override
	public boolean removeById(Long id) {
		if (id == null) return false;

		if (utils.exists(id, this.repository)) {
			this.repository.deleteById(id);
			return true;
		}
		return false;
	}
	@Override
	public boolean update(Long id, ProductModel productmodel) {
		if (id == null) return false;

		Optional<ProductModel> optionalModel = repository.findById(id);
		if (optionalModel.isPresent()) {
			ProductModel existingModel = optionalModel.get();
			BeanUtils.copyProperties(productmodel, existingModel, "id");
			repository.save(existingModel);
			return true;
		}
		return false;
	}

	public Boolean isLent(String name) {
		Optional<ProductModel> model = this.repository.findByName(name);
        return model.map(ProductModel::isLent).orElse(false);
    }
}
