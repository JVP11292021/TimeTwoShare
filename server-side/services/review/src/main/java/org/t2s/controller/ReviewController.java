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
@RequestMapping("/t2s/v1/review")
public class ReviewController implements TControllerEntityResponseWildcard<Integer, ReviewDto, ReviewModel> {
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
	public ResponseEntity<?> removeEntityById(Integer id) {
		 return ResponseEntity.ok(reviewService.removeById(id));
	}
	@Override
	@PutMapping
	public ResponseEntity<?> updateEntity(Integer id, ReviewModel reviewmodel) {
		 return ResponseEntity.ok(reviewService.update(id, reviewmodel));
	}
}
