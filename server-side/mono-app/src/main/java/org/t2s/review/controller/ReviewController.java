package org.t2s.review.controller;

import org.t2s.review.*;
import org.t2s.review.service.*;
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
@RequestMapping("/t2s/v1/review")
@CrossOrigin("http://localhost:4200")
public class ReviewController implements TControllerEntityResponseWildcard<Long, ReviewDto, ReviewModel> {
	private final ReviewService reviewService;
	@Override
	@PostMapping
	public ResponseEntity<?> insertEntity(ReviewDto reviewdto) {
		 return ResponseEntity.ok(reviewService.insert(reviewdto));
	}
	@Override
	@GetMapping
	public ResponseEntity<?> getAllEntities() {
		 return ResponseEntity.ok(reviewService.getAll());
	}
	@Override
	@DeleteMapping
	public ResponseEntity<?> removeEntityById(Long id) {
		 return ResponseEntity.ok(reviewService.removeById(id));
	}
	@Override
	@PutMapping
	public ResponseEntity<?> updateEntity(Long id, ReviewModel reviewmodel) {
		 return ResponseEntity.ok(reviewService.update(id, reviewmodel));
	}
}
