package org.t2s.product;

import jakarta.persistence.*;
import lombok.*;
import org.restframework.web.annotations.markers.CompilationComponent;
import org.restframework.web.core.templates.ModelFrame;

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

	private String description;

	private double price;

	private boolean isLent;

	private String imgUrl;

}
