package ai.polyakov.volshelper.service;


import ai.polyakov.volshelper.model.User;
import ai.polyakov.volshelper.to.UserTo;

import java.util.List;

public interface UserService {
    User save(UserTo userTo);
    UserTo getUser(int id);
    void update(UserTo userTo);
    void delete(int id);
    List<UserTo> getAllUsers();
}
