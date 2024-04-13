package org.t2s.product;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.restframework.web.annotations.markers.CompilationComponent;
import org.restframework.web.core.templates.ModelFrame;
import org.t2s.contract.ContractModel;
import org.t2s.review.ReviewModel;

import java.util.List;

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

	@Column(length = 30000)
	private String imgUrl;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "contract_id")
	private ContractModel contract;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name = "product_id")
	private List<ReviewModel> reviews;

}
