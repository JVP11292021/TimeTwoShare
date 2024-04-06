package org.t2s;

import org.restframework.web.WebApp;
import org.restframework.web.annotations.EnableRestConfiguration;
import org.restframework.web.annotations.RestApi;
import org.restframework.web.annotations.types.API;
import org.restframework.web.annotations.types.FieldData;
import org.restframework.web.annotations.types.Model;
import org.restframework.web.core.generics.Generic;
import org.restframework.web.core.templates.TControllerEntityResponseWildcard;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.io.UnsupportedEncodingException;

@SpringBootApplication
@EnableRestConfiguration
@RestApi(
        controller = TControllerEntityResponseWildcard.class,
        basePackage = "org.t2s",
        APIS = {
                @API(
                        apiName = "Product",
                        apiPackage = "product",
                        endpoint = "/t2s/v1/product",
                        model = @Model(
                                generic = Generic.LONG,
                                tableName = "products",
                                fields = {
                                        @FieldData(name = "name"),
                                        @FieldData(name="description"),
                                        @FieldData(datatype = "double", name = "price"),
                                        @FieldData(datatype = "boolean", name = "isLent"),
                                        @FieldData(name = "imgUrl"),
                                }
                        )
                ),
                @API(
                        apiName = "Contract",
                        apiPackage = "contract",
                        endpoint = "/t2s/v1/contract",
                        model = @Model(
                                generic = Generic.LONG,
                                tableName = "contracts",
                                fields = {
                                    @FieldData(datatype = "Date", name = "begin"),
                                    @FieldData(datatype = "Date", name = "end"),
                                    @FieldData(datatype = "double", name = "lendingPrice")
                                }
                        )
                ),
                @API(
                        apiName = "Review",
                        apiPackage = "review",
                        endpoint = "/t2s/v1/review",
                        model = @Model(
                                generic = Generic.LONG,
                                tableName = "reviews",
                                fields = {
                                        @FieldData(datatype = "int", name = "rating"),
                                        @FieldData(name = "reviewText")
                                }
                        )
                )
        }
)
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class App {
    public static void main(String[] args) throws UnsupportedEncodingException {
        new WebApp(App.class)
                .run(args);
    }
}