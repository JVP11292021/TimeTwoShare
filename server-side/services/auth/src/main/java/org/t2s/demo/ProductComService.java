package org.t2s.demo;

import lombok.RequiredArgsConstructor;
import org.restframework.web.annotations.markers.CompilationComponent;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
@RequiredArgsConstructor
@CompilationComponent
public class ProductComService {
    private final WebClient webClient;

    public Mono<ResponseEntity<String>> insert(Map<String, Object> requestBody) {
        return this.webClient
                .post()
                .uri("/t2s/v1/product/storage")
                .bodyValue(requestBody)
                .retrieve()
                .toEntity(String.class)
                .map(stringResponseEntity -> ResponseEntity.ok("YES"))
                .onErrorResume(error -> Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error.getMessage())));
    }
}
