package org.t2s.product.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.t2s.contract.ContractDto;
import org.t2s.contract.ContractModel;
import org.t2s.product.*;
import org.t2s.product.repository.*;
import lombok.*;
import org.springframework.stereotype.Service;
import org.restframework.web.core.templates.*;
import org.restframework.web.annotations.markers.*;
import org.t2s.review.ReviewDto;
import org.t2s.review.ReviewModel;

import java.util.*;
import java.util.stream.Collectors;

@CompilationComponent
@Data
@AllArgsConstructor
@Service
@Slf4j
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
		log.info("Inserted value into product_db: {}", model);
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
			BeanUtils.copyProperties(productmodel, existingModel, "id", "name", "price","description", "imgUrl");
			repository.save(existingModel);
			log.info("Updated value: {} with id: {}", existingModel, id);
			return true;
		}
		return false;
	}

	public ProductModel getByName(String name) {
		Optional<ProductModel> model = this.repository.findByName(name);
        return model
				.orElse(null);
    }

	public Boolean updateContract(String name, ContractDto contract) {
		log.info("Starting update of product:{} contract:{}", name, contract);
		ProductModel model = this.getByName(name);
		if (model != null) {
			model.setContract(ContractModel.builder()
							.beginDate(contract.getBeginDate())
							.endDate(contract.getEndDate())
							.lendingPrice(contract.getLendingPrice())
					.build());
			model.setLent(!model.isLent());
			this.repository.save(model);
			log.info("Updated model: {}", model);
			return true;
		}

		return false;
	}

	public Boolean updateReview(String name, ReviewDto review) {
		log.info("Starting update of product:{} review:{}", name, review);
		ProductModel model = this.getByName(name);
		if (model != null) {
			model.getReviews()
					.add(ReviewModel.builder()
							.rating(review.getRating())
							.reviewText(review.getReviewText())
							.build());
			this.repository.save(model);
			log.info("Updated model: {}", model);
			return true;
		}

		return false;
	}
}
