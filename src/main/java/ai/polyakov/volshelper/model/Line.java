package ai.polyakov.volshelper.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "line", uniqueConstraints = @UniqueConstraint(columnNames = {"title"}))
public class Line extends BaseEntity {
    @NotBlank
    @Column(name = "title")
    private String title;
    @Min(10)
    @Column(name = "length")
    private Integer length;
    @NotBlank
    @Column(name = "diameter")
    private String diameter;
    @NotBlank
    @Column(name = "start_line")
    private String startLine;
    @NotBlank
    @Column(name = "end_line")
    private String endLine;
    @NotBlank
    @Column(name = "coordinates")
    private String coordinates;

    @Override
    public String toString() {
        return "Line{" +
                ", title='" + title + '\'';
    }
}
