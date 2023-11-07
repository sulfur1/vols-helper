package ai.polyakov.volshelper.service;

import ai.polyakov.volshelper.model.Line;

import java.util.List;

public interface LineService {
    Line save(Line line);
    Line getLine(int id);
    void update(Line line);
    void delete(int id);
    List<Line> getAllLines();

}
