package org.t2s.review.repository;

import org.t2s.review.*;
import org.springframework.stereotype.Repository;
import org.restframework.web.core.templates.*;
import org.restframework.web.annotations.markers.*;
import java.util.*;

@CompilationComponent
@Repository
public interface ReviewRepository extends TRepo<ReviewModel, Long> {
}
