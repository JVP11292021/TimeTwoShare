package org.t2s.product;

import lombok.*;
import org.restframework.web.annotations.markers.CompilationComponent;
import org.restframework.web.core.templates.DtoFrame;
import org.t2s.contract.ContractModel;

@CompilationComponent
@EqualsAndHashCode(callSuper=true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDto extends DtoFrame {
	private String name;

	private String description;

	private double price;

	private boolean isLent;

	private String imgUrl;

	private ContractModel contract;
}
