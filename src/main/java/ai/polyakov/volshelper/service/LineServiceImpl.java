package ai.polyakov.volshelper.service;

import ai.polyakov.volshelper.datajpa.LineRepository;
import ai.polyakov.volshelper.error.NotFoundException;
import ai.polyakov.volshelper.model.Line;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LineServiceImpl implements LineService {

    private final LineRepository lineRepository;

    public LineServiceImpl(LineRepository lineRepository) {
        this.lineRepository = lineRepository;
    }

    @Transactional
    public Line save(Line line) {
        return lineRepository.save(line);
    }
    public Line getLine(int id) {
        return lineRepository.findById(id).orElseThrow(() -> new NotFoundException("line not found"));
    }
    public List<Line> getAllLines() {
        return lineRepository.findAll();
    }
    @Override
    public void update(Line line) {

    }
    public void delete(int id) {
        lineRepository.delete(id);
    }
}
