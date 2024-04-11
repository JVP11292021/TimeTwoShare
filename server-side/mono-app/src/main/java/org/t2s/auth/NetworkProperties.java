package org.t2s.auth;

import lombok.Data;
import org.restframework.web.annotations.markers.CompilationComponent;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@CompilationComponent
@Data
@Component
@ConfigurationProperties("application.context.net")
public class NetworkProperties {
    List<String> cors;
    List<String> methods;
    List<String> headers;
}
