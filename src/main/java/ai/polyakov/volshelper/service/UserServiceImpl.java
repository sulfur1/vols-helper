package ai.polyakov.volshelper.service;

import ai.polyakov.volshelper.datajpa.UserRepository;
import ai.polyakov.volshelper.model.Role;
import ai.polyakov.volshelper.model.User;
import ai.polyakov.volshelper.to.UserTo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public User save(UserTo userTo) {
        User create = new User();
        Role role = new Role();
        role.setRole("USER");
        create.setUsername(userTo.getUsername());
        create.setEmail(userTo.getEmail());
        create.setPassword(passwordEncoder.encode(userTo.getPassword()));
        create.addRole(role);

        return userRepository.save(create);
    }

    @Override
    public UserTo getUser(int id) {
        return null;
    }

    @Override
    public void update(UserTo userTo) {

    }

    @Override
    public void delete(int id) {

    }

    @Override
    public List<UserTo> getAllUsers() {
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(String.format("User with email: %s not found", email)));
    }
}
