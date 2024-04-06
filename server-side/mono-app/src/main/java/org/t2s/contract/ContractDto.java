package org.t2s.contract;

import lombok.*;
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
public class ContractDto extends DtoFrame {
	private Date beginDate;

	private Date endDate;

	private double lendingPrice;

	private ProductModel product;
}
