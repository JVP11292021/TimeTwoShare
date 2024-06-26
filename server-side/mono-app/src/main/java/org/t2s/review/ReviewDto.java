package org.t2s.review;

import lombok.*;
import org.restframework.web.annotations.markers.CompilationComponent;
import org.restframework.web.core.templates.DtoFrame;
import org.t2s.product.ProductModel;

@CompilationComponent
@EqualsAndHashCode(callSuper=true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewDto extends DtoFrame {
	private double rating;

	private String reviewText;
}
