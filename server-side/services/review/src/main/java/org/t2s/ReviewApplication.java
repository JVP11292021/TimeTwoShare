package org.t2s;

import org.restframework.web.WebApp;
import org.restframework.web.annotations.EnableRestConfiguration;
import org.restframework.web.annotations.gen.GenDto;
import org.restframework.web.annotations.gen.GenModel;
import org.restframework.web.annotations.gen.GenProperties;
import org.restframework.web.annotations.gen.GenSpring;
import org.restframework.web.annotations.types.FieldData;
import org.restframework.web.core.generics.Generic;
import org.restframework.web.core.templates.TControllerEntityResponseWildcard;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import java.io.UnsupportedEncodingException;

@EnableRestConfiguration(useCustomGenerationStrategy = true)
@GenProperties(basePackage = "org.t2s", apiName = "Review", indexColumnType = Generic.INTEGER, endpoint = "/t2s/v1/review")
@GenDto
@GenModel(tableName = "reviews", fields = { // TODO add manyToOne rel to User
        @FieldData(datatype = "int", name = "rating"),
})
@GenSpring(controller = TControllerEntityResponseWildcard.class)
@EnableDiscoveryClient
@SpringBootApplication
public class ReviewApplication {
    public static void main(String[] args) throws UnsupportedEncodingException {
        new WebApp(ReviewApplication.class)
                .run(args);
    }
}