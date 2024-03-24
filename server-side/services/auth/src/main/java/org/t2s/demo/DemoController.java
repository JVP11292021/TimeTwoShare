package org.t2s.demo;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@RestController
@RequestMapping("/t2s/v1/demo-controller")
@Hidden
@RequiredArgsConstructor
public class DemoController {

  private final ProductComService service;

  @GetMapping
  public ResponseEntity<String> sayHello() {
    return ResponseEntity.ok("Hello from secured endpoint");
  }

  @PostMapping
  public ResponseEntity<?> makePostRequest(@RequestBody Map<String, Object> requestBody) {
    // Make a POST request using MyWebClient
    return this.service.insert(requestBody).block();
  }

}
