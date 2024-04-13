package org.t2s.contract.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.t2s.contract.*;
import org.t2s.contract.repository.*;
import lombok.*;
import org.springframework.stereotype.Service;
import org.restframework.web.core.templates.*;
import org.restframework.web.annotations.markers.*;

import java.util.*;
import java.util.stream.Collectors;

@CompilationComponent
@Data
@AllArgsConstructor
@Service
@Slf4j
public class ContractService implements TServiceCRUD<Long, ContractDto, ContractModel> {
	private final ContractRepository repository;
	@Override
	public int insert(ContractDto contractdto) {
		ContractModel model = ContractModel.builder()
				.endDate(contractdto.getEndDate())
				.beginDate(contractdto.getBeginDate())
				.lendingPrice(contractdto.getLendingPrice())
//				.product(contractdto.getProduct())
				.build();
		log.info("Inserted value into contract_db: {}", model);
		this.repository.save(model);
		return 1;
	}
	@Override
	public List<ContractDto> getAll() {
		 return this.repository
				 .findAll()
				 	.stream()
				 	.map(contractModel -> ContractDto.builder()
							.endDate(contractModel.getEndDate())
							.beginDate(contractModel.getBeginDate())
							.lendingPrice(contractModel.getLendingPrice())
							.build())
				 .collect(Collectors.toList());
	}
	@Override
	public boolean removeById(Long id) {
		if (id == null) return false;

		if (utils.exists(id, this.repository)) {
			this.repository.deleteById(id);
			return true;
		}
		return false;
	}
	@Override
	public boolean update(Long id, ContractModel contractmodel) {
		if (id == null) return false;

		Optional<ContractModel> optionalModel = repository.findById(id);
		if (optionalModel.isPresent()) {
			ContractModel existingModel = optionalModel.get();
			BeanUtils.copyProperties(existingModel, contractmodel, "id");
			repository.save(existingModel);
			return true;
		}
		return false;
	}
}
