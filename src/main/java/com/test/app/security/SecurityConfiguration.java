package com.test.app.security;

import java.util.ArrayList;

import javax.sql.DataSource;

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
	
	@Autowired
	DataSource dataSource;
	
	
	/*@Value("${spring.queries.users-query}")
	private String usersQuery;*/
	
	  @Override
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		  
		  /*ArrayList<Account> acc = accountService.getAllAccounts();
		  for(int i=0;i<acc.size();i++){			  
		  
	        auth.eraseCredentials( false ).inMemoryAuthentication()
	          .withUser(acc.get(i).getUsername()).password(acc.get(i).getPassword()).roles("USER");
		  }*/
		  
		  auth.
			jdbcAuthentication()
				.usersByUsernameQuery("SELECT USERNAME,PASSWORD,enabled FROM account WHERE USERNAME=?")
				.authoritiesByUsernameQuery("SELECT USERNAME,ACCOUNTYPENAME FROM account INNER JOIN accountype ON account.IDACCOUNTTYPE = accountype.IDACCOUNTYPE WHERE USERNAME = ? ")
				.dataSource(dataSource);
	

		  
		  
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
            		  "/CreateNewInvoicePage","/registationRequestPageList","/ticketsToDo").access("hasRole('ROLE_ADMIN')")
              	        
	        .and().formLogin()
            .loginPage("/loginPage")
            .loginProcessingUrl("/login")
            .usernameParameter("username")
            .passwordParameter("password")
            .defaultSuccessUrl("/startPage",true)
             .failureUrl("/unauthorized")
             .and()
             .logout().logoutSuccessUrl("/loginPage");
	        
	        http.csrf().disable();
	    }
	    
	   
}