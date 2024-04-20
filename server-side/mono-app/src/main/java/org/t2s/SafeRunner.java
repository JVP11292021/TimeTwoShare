package org.t2s;

import lombok.extern.slf4j.Slf4j;
import org.restframework.web.WebApp;
import org.springframework.boot.SpringApplication;

@Slf4j
public class SafeRunner {
    private SafeRunner() {}

    public static void safeApplicationRunner(Class<?> clazz, String[] args) {
        try {
            new WebApp(App.class)
                    .run(args);
        } catch (Exception e) {
            log.error("Error - {}", e.getMessage());
            SpringApplication.run(App.class);
        }
    }
}
