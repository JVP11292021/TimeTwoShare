package org.t2s;

import org.restframework.web.WebApp;
import org.restframework.web.annotations.EnableRestConfiguration;
import org.restframework.web.annotations.gen.GenDto;
import org.restframework.web.annotations.gen.GenModel;
import org.restframework.web.annotations.gen.GenProperties;
import org.restframework.web.annotations.gen.GenSpring;
import org.restframework.web.annotations.types.FieldData;
import org.restframework.web.core.generics.Generic;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.UnsupportedEncodingException;

@EnableRestConfiguration(useCustomGenerationStrategy = true)
@GenProperties(basePackage = "org.t2s", indexColumnType = Generic.INTEGER, apiName = "Product", endpoint = "/t2s/v1/product/")
@GenDto
@GenModel(tableName = "products", fields = { // TODO add manyToOne rel to User
        @FieldData(name = "name"),
        @FieldData(datatype = "boolean", name = "isLent"),
        @FieldData(datatype = "Date", name = "deadline")
})
@GenSpring
@SpringBootApplication
public class ProductApplication {
    public static void main(String[] args) throws UnsupportedEncodingException {
        new WebApp(ProductApplication.class)
                .run(args);
    }
}