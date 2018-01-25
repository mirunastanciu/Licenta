package com.test.app.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

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

	  @Override
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		 
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
	          .antMatchers("/","/loginPage",
		        		  "/registerAccount",
		        		  "/registationRequestPage",
		        		  "/accountvalidation",
		        		  "/registrationRequest",
		        		  "/saveClientAccount",
		        		  "/css/**", 
		        		  "/js/**").permitAll()
              .antMatchers("/startPage",
            		  	   "/myAccountPage",
            		  	   "/newTicketPage",
            		  	   "/accountsPage",
            		  	   "/contractsPage",
            		  	   "/invoicePage",
            		  	   "/CreateNewInvoicePage",
            		  	   "/registationRequestPageList",
            		  	   "/ticketsToDo",
            		  	   "/accountName",
            		  	   "/checkOldPass",
            		  	   "/account*",
            		  	   "/update*",
            		  	   "/get*",
            		  	   "/changeAddressMyAcc",
            		  	   "/approveInvoice",
            		  	   "/rejectInvoice",
            		  	   "/save*",
            		  	   "/delete*",
            		  	   "/clientDetailsForMyAcc",
            		  	   "/employee*",
            		  	   "/regist*",
            		  	   "/totalInvoice",
            		  	   "/all*",
            		  	   "/processRequest",
            		  	   "/tickets*",
            		  	   "/unassign",
            		  	   "/assignToMe",
            		  	   "/addTicket").access("hasAnyRole('ROLE_ADMIN','ROLE_CLIENT','ROLE_EMP')")
              	        
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









