package ai.polyakov.volshelper.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Line {
    private Integer id;
    private String title;
    private String length;
    private String diameter;
    private String from;
    private String to;
    private String coordinates;

    public Line() {
    }
    public Line(String title, String length, String diameter, String from, String to, String coordinates) {
        this(null, title, length, diameter, from, to, coordinates);
    }
    public Line(Integer id, String title, String length, String diameter, String from, String to, String coordinates) {
        this.id = id;
        this.title = title;
        this.length = length;
        this.diameter = diameter;
        this.from = from;
        this.to = to;
        this.coordinates = coordinates;
    }

    @Override
    public String toString() {
        return "Line{" +
                "name='" + title + '\'' +
                ", length='" + length + '\'' +
                ", diameter='" + diameter + '\'' +
                ", from='" + from + '\'' +
                ", to='" + to + '\'' +
                ", coordinates='" + coordinates + '\'' +
                '}';
    }
}
