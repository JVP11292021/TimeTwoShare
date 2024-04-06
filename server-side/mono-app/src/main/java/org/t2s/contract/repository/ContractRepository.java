package org.t2s.contract.repository;

import org.t2s.contract.*;
import org.springframework.stereotype.Repository;
import org.restframework.web.core.templates.*;
import org.restframework.web.annotations.markers.*;
import java.util.*;

@CompilationComponent
@Repository
public interface ContractRepository extends TRepo<ContractModel, Long> {
}
