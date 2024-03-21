package org.t2s.repository;

import org.t2s.*;
import org.springframework.stereotype.Repository;
import org.restframework.web.core.templates.*;
import org.restframework.web.annotations.markers.*;
import java.util.*;

@UpdateComponent
@CompilationComponent
@Repository
public interface ReviewRepository extends TRepo<ReviewModel, Integer> {
}
