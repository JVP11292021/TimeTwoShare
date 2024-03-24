package org.t2s.review;

import org.t2s.review.*;
import lombok.*;
import jakarta.persistence.*;
import org.restframework.web.core.templates.*;
import org.restframework.web.annotations.markers.*;
import java.util.*;

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
	private int rating;

}
