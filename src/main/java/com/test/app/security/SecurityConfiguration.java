/*package com.test.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;

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






    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	 http
         .csrf().disable()
         .formLogin()
             .loginPage("/loginPage")
             .defaultSuccessUrl("/startPage")
             .usernameParameter("j_username")
             .passwordParameter("j_password")
             .loginProcessingUrl("/accountvalidation")
             .failureUrl("/unauthorized")
             .permitAll()
             .and()
         .logout()
             .logoutUrl("/logout")
             .logoutSuccessUrl("/login")
             .and()
         .authorizeRequests()
             .antMatchers("/startPage").hasAuthority("USER")
             .antMatchers("/accountvalidation").permitAll()
             .and()
         .userDetailsService(userDetailsService);

    	
    	
    	

      http.authorizeRequests()
        .antMatchers("/","/loginPage","/registerAccount","/registationRequestPage","/accountvalidation", "/css/**", "/js/**").permitAll()
        .antMatchers("/invoicePage").access("hasRole('USER')")
        .and().formLogin().loginPage("/loginPage").permitAll()
        .defaultSuccessUrl("/startPage")
        .usernameParameter("username")
        .passwordParameter("password")
        .loginProcessingUrl("/accountvalidation")
        
        .and().logout()
        .logoutSuccessUrl("/index.html");


      http.csrf().disable();
      //antMatchers("/invoicePage","/newTicketPage","/accountsPage","/contractsPage","/CreateNewInvoicePage",
      		//"/registationRequestPage","/registationRequestPageList","/myAccountPage").access("hasRole('USER')")
    }

	@Autowired
	private UserDetailsService userDetailsService;

	@Bean
	public UserDetailsService userDetailsService() {
	    return super.userDetailsService();
	}
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		web
        .ignoring()
           .antMatchers("/resources/**");
	}


}*/