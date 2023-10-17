package ai.polyakov.volshelper.web.ui;

import ai.polyakov.volshelper.model.Line;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/line")
    public String line() {
        return "createOrEditLine";
    }
    @PostMapping("/line")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void create(Line line) {
        System.out.println(line);
    }
}
