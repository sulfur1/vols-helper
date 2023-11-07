package ai.polyakov.volshelper.web;

import ai.polyakov.volshelper.service.LineService;
import ai.polyakov.volshelper.service.UserService;
import ai.polyakov.volshelper.to.UserTo;
import ai.polyakov.volshelper.web.ui.AdminUILineController;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class RootController {
    private static final Logger log = LoggerFactory.getLogger(RootController.class);
    private final UserService userService;

    public RootController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String home() {
        log.info("forward to home page");
        return "index";
    }

    @GetMapping("/lines")
    public String lines() {
        log.info("forward to lines page");
        return "lines";
    }

    @GetMapping("/login")
    public String login() {
        log.info("forward to login page");
        return "login";
    }
    @GetMapping("/register")
    public String register(Model model) {
        log.info("forward to register page");
        UserTo register = new UserTo();
        model.addAttribute("user", register);
        return "register";
    }
    @PostMapping("/register")
    public String registerUser(@Valid UserTo userTo) {
        log.info("save user");
        userService.save(userTo);
        return "redirect:/login";
    }

}
