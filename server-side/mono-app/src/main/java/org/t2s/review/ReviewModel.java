package org.t2s.review;

import jakarta.persistence.*;
import lombok.*;
import org.restframework.web.annotations.markers.CompilationComponent;
import org.restframework.web.core.templates.ModelFrame;
import org.t2s.product.ProductModel;

@CompilationComponent
@EqualsAndHashCode(callSuper=true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="reviews")
public class ReviewModel extends ModelFrame<Long> {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	private double rating;

	private String reviewText;

}
