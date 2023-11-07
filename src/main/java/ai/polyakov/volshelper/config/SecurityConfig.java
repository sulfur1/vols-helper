package ai.polyakov.volshelper.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http

                .authorizeRequests(authorizationManagerRequestMatcherRegistry -> {
                    authorizationManagerRequestMatcherRegistry.requestMatchers( "/resources/**", "/img/**", "/js/**", "/css/outer/**", "/webjars/**", "/", "/login").permitAll();
                    //authorizationManagerRequestMatcherRegistry.requestMatchers("/").permitAll();
                    authorizationManagerRequestMatcherRegistry.requestMatchers( "/login", "/register").anonymous();
                    authorizationManagerRequestMatcherRegistry.requestMatchers(HttpMethod.POST, "/login").anonymous();
                    /*authorizationManagerRequestMatcherRegistry.requestMatchers("/login").permitAll();
                    authorizationManagerRequestMatcherRegistry.requestMatchers().permitAll();*/
                    authorizationManagerRequestMatcherRegistry.requestMatchers("/lines/**").hasAnyRole("ADMIN");
                    authorizationManagerRequestMatcherRegistry.anyRequest().authenticated();
                })
                .formLogin(httpSecurityFormLoginConfigurer -> {
                    httpSecurityFormLoginConfigurer.loginPage("/login").defaultSuccessUrl("/", true);
                })
                .logout(httpSecurityLogoutConfigurer -> {
                    httpSecurityLogoutConfigurer.logoutUrl("/logout");
                    httpSecurityLogoutConfigurer.logoutSuccessUrl("/");
                });
                //.sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.));
        return http.build();
    }
}
