package org.t2s.auth.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepo extends JpaRepository<Token, Integer> {
    @Query(value = """
      select t from Token t inner join User u\s
      on t.user.id = u.id\s
      where u.id = :id and (t.expired = false or t.revoked = false)\s
      """)
    List<Token> findAllValidTokenByUser(Integer id);

    @Query(value="SELECT t.token FROM Token t WHERE t.user.email = :userEmail AND t.expired = false")
    String findActiveAccessTokenByUserEmail(@Param("userEmail") String userEmail);

    Optional<Token> findByToken(String token);
}
