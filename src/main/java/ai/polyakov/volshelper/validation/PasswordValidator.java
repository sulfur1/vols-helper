package ai.polyakov.volshelper.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PasswordValidator implements ConstraintValidator<PassValid, String> {
    private Pattern pattern;
    private Matcher matcher;

    private static final String regex = "^(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$";
    @Override
    public void initialize(PassValid constraintAnnotation) {
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext constraintValidatorContext) {
        return passwordValidation(password);
    }

    private boolean passwordValidation(String password) {
        pattern = Pattern.compile(regex);
        matcher = pattern.matcher(password);
        return matcher.matches();
    }
}
