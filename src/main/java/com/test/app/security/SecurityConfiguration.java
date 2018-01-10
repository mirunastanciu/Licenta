/*package com.test.app.security;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
 
*//**
 * Spring Web MVC Security Java Config Demo Project
 * Configures authentication and authorization for the application.
 *
 * @author www.codejava.net
 *
 *//*
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Autowired
    private LoggingAccessDeniedHandler accessDeniedHandler;
     
    @Override
    protected void configure(HttpSecurity http) throws Exception {
   
      http.authorizeRequests()
        .antMatchers("/","/accountvalidation").permitAll()
        .antMatchers("/invoicePage","/newTicketPage","/accountsPage","/contractsPage","/CreateNewInvoicePage",
      		"/registationRequestPage","/registationRequestPageList","/myAccountPage").access("hasRole('USER')")
        .and().formLogin().loginProcessingUrl("/startPage").loginPage("/loginPage").permitAll()
        .and().logout()
        .invalidateHttpSession(true)
        .clearAuthentication(true)
        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
        .logoutSuccessUrl("/login?logout")
        .permitAll()
    .and()
    .exceptionHandling()
        .accessDeniedHandler(accessDeniedHandler);
      
      //http.formLogin().loginPage("/loginPage").loginProcessingUrl("/accountvalidation");
      
      http.csrf().disable();
      //antMatchers("/invoicePage","/newTicketPage","/accountsPage","/contractsPage","/CreateNewInvoicePage",
      		//"/registationRequestPage","/registationRequestPageList","/myAccountPage").access("hasRole('USER')")
    }   
    
   
}*/