package ai.polyakov.volshelper.to;


import ai.polyakov.volshelper.validation.EmailValid;
import ai.polyakov.volshelper.validation.PassValid;
import ai.polyakov.volshelper.validation.PasswordMatches;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@PasswordMatches
public class UserTo {
    @NotBlank
    private String username;
    @NotBlank
    @EmailValid
    private String email;
    @NotBlank
    @PassValid
    private String password;
    @NotBlank
    private String matchingPassword;
}
