package ai.polyakov.volshelper.web.rest;

import ai.polyakov.volshelper.model.Line;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/admin")
public class AdminRestController {

    @GetMapping("/lines")
    public List<Line> getLines() {
        return List.of(
                new Line("1", "asdasd", "asdasd", "asdasd", "asdasd"),
                new Line("2", "asdasd", "asdasd", "asdasd", "asdasd"),
                new Line("3", "asdasd", "asdasd", "asdasd", "asdasd")
                );
    }
}
