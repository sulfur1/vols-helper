package ai.polyakov.volshelper.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "users")
@EqualsAndHashCode(callSuper = true, of = "email")
public class User extends BaseEntity implements UserDetails, Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @Column
    private String username;
    @Column
    private String email;
    @Column
    private String password;
    @Column
    private Boolean enabled = true;
    @Column(name = "account_non_expired")
    private Boolean accountNonExpired = true;
    @Column(name = "account_non_locked")
    private Boolean accountNonLocked = true;
    @Column(name = "credentials_non_expired")
    private Boolean credentialsNonExpired = true;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    /*@JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))*/
    private Set<Role> roles = new HashSet<>();

    public void addRole(Role role) {
        roles.add(role);
        role.getUsers().add(this);
    }
    public void deleteRole(Role role) {
        roles.remove(role);
        role.getUsers().remove(this);
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getAuthority()))
                .collect(Collectors.toList());
    }

    public User(String username, String email, String password) {
        super(null);
        this.username = username;
        this.email = email;
        this.password = password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
}
