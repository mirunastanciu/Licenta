package com.test.app.security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
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
  
	@Autowired
	AccountService accountService;
	
	
	  @Override
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		  
		  ArrayList<Account> acc = accountService.getAllAccounts();
		  for(int i=0;i<acc.size();i++){			  
		  
	        auth.inMemoryAuthentication()
	          .withUser(acc.get(i).getUsername()).password(acc.get(i).getPassword()).roles("USER");
		  }
	    }
	  
	  @Override
		public void configure(WebSecurity web) throws Exception {
			web
	        .ignoring()
	           .antMatchers("/resources/**");
		}
	 
	    @Override
	    protected void configure(HttpSecurity http) throws Exception {	    
	   
	        http
	        .authorizeRequests()
	          .antMatchers("/","/loginPage","/registerAccount","/registationRequestPage","/accountvalidation", "/css/**", "/js/**").permitAll()
              .antMatchers("/startPage","/myAccountPage","/newTicketPage","/accountsPage","/contractsPage","/invoicePage",
            		  "/CreateNewInvoicePage","/registationRequestPageList","/ticketsToDo").access("hasRole('USER')")
              	        
	        .and().formLogin()
            .loginPage("/loginPage")
            .loginProcessingUrl("/j_spring_security_check")
            .usernameParameter("j_username")
            .passwordParameter("j_password")
            .defaultSuccessUrl("/startPage",true)
             .failureUrl("/unauthorized")
             .and()
             .logout().logoutSuccessUrl("/loginPage");
	        
	        http.csrf().disable();
	    }
}