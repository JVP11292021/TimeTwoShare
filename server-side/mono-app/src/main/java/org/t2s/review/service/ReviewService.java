package org.t2s.review.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.t2s.product.ProductModel;
import org.t2s.review.*;
import org.t2s.review.repository.*;
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
@Slf4j
public class ReviewService implements TServiceCRUD<Long, ReviewDto, ReviewModel> {
	private final ReviewRepository repository;
	@Override
	public int insert(ReviewDto reviewdto) {
		ReviewModel model = ReviewModel.builder()
				.reviewText(reviewdto.getReviewText())
				.rating(reviewdto.getRating())
				.build();
		this.repository.save(model);
		log.info("Inserted value into review_db: {}", model);
		return 1;
	}
	@Override
	public List<ReviewDto> getAll() {
		 return this.repository
				 .findAll()
				 .stream()
				 .map(reviewModel -> ReviewDto.builder()
						 .reviewText(reviewModel.getReviewText())
						 .rating(reviewModel.getRating())
						 .build())
				 .collect(Collectors.toList());
	}
	@Override
	public boolean removeById(Long id) {
		 if (id == null || utils.exists(id, this.repository)) return false;
		 this.repository.deleteById(id);
		 return true;
	}
	@Override
	public boolean update(Long id, ReviewModel reviewmodel) {
		if (id == null) return false;

		Optional<ReviewModel> optionalModel = repository.findById(id);
		if (optionalModel.isPresent()) {
			ReviewModel existingModel = optionalModel.get();
			BeanUtils.copyProperties(reviewmodel, existingModel, "id");
			repository.save(existingModel);
			return true;
		}
		return false;
	}
}
