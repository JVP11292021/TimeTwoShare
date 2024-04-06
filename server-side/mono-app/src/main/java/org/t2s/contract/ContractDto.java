package org.t2s.contract;

import org.t2s.contract.*;
import lombok.*;
import org.restframework.web.core.templates.*;
import org.restframework.web.annotations.markers.*;
import java.util.*;

@CompilationComponent
@EqualsAndHashCode(callSuper=true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ContractDto extends DtoFrame {
	private Date begin;

	private Date end;

	private double lendingPrice;

}
