package ai.polyakov.volshelper.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.*;

@Target({TYPE, FIELD, ANNOTATION_TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = PasswordValidator.class)
public @interface PassValid {
    String message() default "Поле пароля: Минимум 8 символов, одна цифра, одна буква в верхнем регистре и одна в нижнем";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
