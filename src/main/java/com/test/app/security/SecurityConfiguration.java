package com.test.app.security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import com.test.app.account.Account;
import com.test.app.account.AccountRepository;
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
     
	@Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		ArrayList<Account> account = accountService.getAllAccounts();
		for (int i=0;i<account.size();i++) {
           
            	auth
                .inMemoryAuthentication()
                    .withUser(account.get(i).getUsername()).password(account.get(i).getPassword()).roles("USER");
            }
        
        
    }


     
    @Override
    protected void configure(HttpSecurity http) throws Exception {
   
      http.authorizeRequests()
        .antMatchers("/").permitAll()
        .antMatchers("/invoicePage","/newTicketPage","/accountsPage","/contractsPage","/CreateNewInvoicePage",
      		"/registationRequestPage","/registationRequestPageList","/myAccountPage").access("hasRole('USER')")
        .and().formLogin()	.loginPage("/loginPage");
      
      //http.formLogin().loginPage("/loginPage").loginProcessingUrl("/accountvalidation");
      
      http.csrf().disable();
      //antMatchers("/invoicePage","/newTicketPage","/accountsPage","/contractsPage","/CreateNewInvoicePage",
      		//"/registationRequestPage","/registationRequestPageList","/myAccountPage").access("hasRole('USER')")
    }   
}