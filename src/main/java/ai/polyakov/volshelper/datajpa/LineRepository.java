package ai.polyakov.volshelper.datajpa;

import ai.polyakov.volshelper.model.Line;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public interface LineRepository extends JpaRepository<Line, Integer> {
    @Modifying
    @Transactional
    @Query("DELETE FROM Line l WHERE l.id=:id")
    int delete(@Param("id") int id);
}
