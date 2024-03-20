package org.t2s;

import org.t2s.*;
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
@Table(name="products")
public class ProductModel extends ModelFrame<Integer> {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	private String name;

	private boolean isLent;

	private Date deadline;

}
