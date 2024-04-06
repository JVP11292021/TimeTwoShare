package org.t2s.contract.service;

import org.t2s.contract.*;
import org.t2s.contract.repository.*;
import lombok.*;
import org.springframework.stereotype.Service;
import org.restframework.web.core.templates.*;
import org.restframework.web.annotations.markers.*;
import java.util.*;

@CompilationComponent
@Data
@AllArgsConstructor
@Service
public class ContractService implements TServiceCRUD<Long, ContractDto, ContractModel> {
	private final ContractRepository repository;
	@Override
	public int insert(ContractDto contractdto) {
		 return 0;
	}
	@Override
	public List<ContractDto> getAll() {
		 return null;
	}
	@Override
	public boolean removeById(Long id) {
		 return false;
	}
	@Override
	public boolean update(Long id, ContractModel contractmodel) {
		 return false;
	}
}
