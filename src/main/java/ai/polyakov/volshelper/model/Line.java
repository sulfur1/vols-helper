package ai.polyakov.volshelper.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Line {
    private String name;
    private String length;
    private String diameter;
    private String from;
    private String to;
}
