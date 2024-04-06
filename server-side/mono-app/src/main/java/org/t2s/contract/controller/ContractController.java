package org.t2s.contract.controller;

import org.t2s.contract.*;
import org.t2s.contract.service.*;
import lombok.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.restframework.web.core.templates.*;
import org.restframework.web.annotations.markers.*;
import java.util.*;

@CompilationComponent
@Data
@AllArgsConstructor
@RestController
@RequestMapping("/t2s/v1/contract")
public class ContractController implements TControllerEntityResponseWildcard<Long, ContractDto, ContractModel> {
	private final ContractService contractService;
	@Override
	@PostMapping
	public ResponseEntity<?> insertEntity(@RequestBody ContractDto contractdto) {
		 return ResponseEntity.ok(contractService.insert(contractdto));
	}
	@Override
	@GetMapping
	public ResponseEntity<?> getAllEntities() {
		 return ResponseEntity.ok(contractService.getAll());
	}
	@Override
	@DeleteMapping
	public ResponseEntity<?> removeEntityById(Long id) {
		 return ResponseEntity.ok(contractService.removeById(id));
	}
	@Override
	@PutMapping
	public ResponseEntity<?> updateEntity(Long id, @RequestBody ContractModel contractmodel) {
		 return ResponseEntity.ok(contractService.update(id, contractmodel));
	}
}
