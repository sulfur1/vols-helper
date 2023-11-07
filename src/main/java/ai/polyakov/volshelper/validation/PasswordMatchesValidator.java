package ai.polyakov.volshelper.validation;

import ai.polyakov.volshelper.to.UserTo;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {
    @Override
    public void initialize(PasswordMatches constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        UserTo user = (UserTo) o;
        return user.getPassword().equals((user.getMatchingPassword()));
    }
}
