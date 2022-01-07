package com.example.cinemania.security

import com.example.cinemania.domains.user.repository.UserRepository
import com.example.cinemania.security.jwt.JwtAuthenticationEntryPoint
import com.example.cinemania.security.jwt.JwtRequestFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy.STATELESS
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter


@Configuration
class WebSecurityConfiguration(
    private val userRepository: UserRepository,
    private val jwtRequestFilter: JwtRequestFilter,
    private val unauthorizedHandler: JwtAuthenticationEntryPoint
) : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        http
            .cors().and()
            .csrf().disable()
            .authorizeRequests()
            .antMatchers("/movie/**", "/tv/**", "/user/**", "/auth/**").permitAll()
            .antMatchers("/watched/**").permitAll()
            .antMatchers("/user/admin").hasRole("ADMIN")
            .antMatchers("/user/only_user").hasRole("USER")
            .anyRequest().authenticated()
            .and()
            .sessionManagement().sessionCreationPolicy(STATELESS)
            .and()
            .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and();

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter::class.java)
    }

    override fun configure(auth: AuthenticationManagerBuilder) {
        auth.authenticationProvider(authenticationProvider())
    }

    @Bean
    fun authenticationProvider(): AuthenticationProvider {
        val provider: DaoAuthenticationProvider = DaoAuthenticationProvider()
        val detailsService: CinemaniaUserDetailsService = CinemaniaUserDetailsService(userRepository)
        provider.setUserDetailsService(detailsService)
        provider.setPasswordEncoder(passwordEncoder())
        return provider
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    override fun authenticationManagerBean(): AuthenticationManager {
        return super.authenticationManagerBean()
    }
}