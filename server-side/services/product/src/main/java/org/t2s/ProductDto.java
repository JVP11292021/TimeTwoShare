package org.t2s;

import org.t2s.*;
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
public class ProductDto extends DtoFrame {
	private String name;

	private boolean isLent;

	private Date deadline;

}
