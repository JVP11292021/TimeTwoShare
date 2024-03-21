package org.t2s;

import lombok.*;
import org.restframework.web.annotations.markers.CompilationComponent;
import org.restframework.web.core.templates.DtoFrame;

import java.util.Date;

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
