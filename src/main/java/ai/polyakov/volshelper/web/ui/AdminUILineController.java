package ai.polyakov.volshelper.web.ui;

import ai.polyakov.volshelper.model.Line;
import ai.polyakov.volshelper.service.LineService;
import ai.polyakov.volshelper.service.LineServiceImpl;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/lines")
public class AdminUILineController {

    private static final Logger log = LoggerFactory.getLogger(AdminUILineController.class);
    private final LineService lineService;

    public AdminUILineController(LineService lineService) {
        this.lineService = lineService;
    }

    @GetMapping("/create")
    public String createView() {
        return "createLine";
    }
    @GetMapping("/{id}/update")
    public String editView(@PathVariable int id, Model model) {
        Line line = lineService.getLine(id);
        model.addAttribute("line", line);
        return "editLine";
    }
    @ResponseBody
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Line> getAllLines() {
        return lineService.getAllLines();
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void create(@Valid Line line) {
        log.info("create {}", line);
        lineService.save(line);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id) {
        log.info("delete line with id: {}", id);
        lineService.delete(id);
    }
}
