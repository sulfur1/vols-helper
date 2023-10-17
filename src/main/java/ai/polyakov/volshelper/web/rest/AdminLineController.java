package ai.polyakov.volshelper.web.rest;

import ai.polyakov.volshelper.model.Line;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping(value = "/rest/admin/line", produces = MediaType.APPLICATION_JSON_VALUE)
public class AdminLineController {

    @GetMapping()
    public List<Line> getAllLines() {
        return Collections.emptyList();
    }

}
