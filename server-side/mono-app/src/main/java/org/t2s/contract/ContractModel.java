package org.t2s.contract;

import lombok.*;
import jakarta.persistence.*;
import org.restframework.web.core.templates.*;
import org.restframework.web.annotations.markers.*;
import org.t2s.product.ProductModel;

import java.util.*;

@CompilationComponent
@EqualsAndHashCode(callSuper=true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="contracts")
public class ContractModel extends ModelFrame<Long> {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id")
	private Long id;
	private Date beginDate;

	private Date endDate;

	private double lendingPrice;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "product_id", referencedColumnName = "id")
	private ProductModel product;

	// TODO add some sort of relation betweem this table and the t_user table
}
