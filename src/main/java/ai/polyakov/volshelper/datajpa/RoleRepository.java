package ai.polyakov.volshelper.datajpa;

import ai.polyakov.volshelper.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RoleRepository extends JpaRepository<Role, Integer> {
}
