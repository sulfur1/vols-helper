package ai.polyakov.volshelper.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class RootController {

    @GetMapping
    public String home(Model model) {
        model.addAttribute("message", "Hello World!");
        return "index";
    }

    @GetMapping("/lines")
    public String lines() {
        return "lines";
    }
}
