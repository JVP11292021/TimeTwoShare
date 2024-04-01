package org.t2s.product;

import org.t2s.product.*;
import lombok.*;
import jakarta.persistence.*;
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
@Entity
@Table(name="products")
public class ProductModel extends ModelFrame<Long> {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	private String name;

	private boolean isLent;

	private Date deadline;

	private String description;

}
