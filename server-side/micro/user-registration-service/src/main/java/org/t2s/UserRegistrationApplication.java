package org.t2s;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class UserRegistrationApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserRegistrationApplication.class);
    }
}