package org.t2s.review;

import org.t2s.review.*;
import lombok.*;
import org.restframework.web.core.templates.*;
import org.restframework.web.annotations.markers.*;
import java.util.*;

@UpdateComponent
@CompilationComponent
@EqualsAndHashCode(callSuper=true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewDto extends DtoFrame {
	private int rating;

	private String reviewText;

}
