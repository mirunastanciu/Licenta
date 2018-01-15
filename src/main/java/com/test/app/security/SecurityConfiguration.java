package com.test.app.security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import com.test.app.account.Account;
import com.test.app.account.AccountService;

/**
 * Spring Web MVC Security Java Config Demo Project
 * Configures authentication and authorization for the application.
 *
 * @author www.codejava.net
 *
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {






    @Override
    protected void configure(HttpSecurity http) throws Exception {

      http.authorizeRequests()
        .antMatchers("/").permitAll()
        .antMatchers("/invoicePage","/newTicketPage","/accountsPage","/contractsPage","/CreateNewInvoicePage",
      		"/registationRequestPage","/registationRequestPageList","/myAccountPage").access("hasRole('USER')")
        .and().formLogin().loginPage("/loginPage").permitAll()
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


}