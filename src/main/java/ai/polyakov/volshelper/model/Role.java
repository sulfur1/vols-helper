package ai.polyakov.volshelper.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.security.core.GrantedAuthority;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "roles")
public class Role extends BaseEntity implements GrantedAuthority {
    @Column(name = "role")
    private String role;
    @ManyToMany(mappedBy = "roles")
    private Set<User> users = new HashSet<>();
    @Override
    public String getAuthority() {
        return "ROLE_" + role;
    }
}
