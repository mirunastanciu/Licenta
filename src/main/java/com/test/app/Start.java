package com.test.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication(scanBasePackages = {"com.test.app"})
@PropertySource("classpath:application.properties")
@EnableAutoConfiguration

public class Start{
    
	public static void main(String[] args) {
		
		SpringApplication.run(Start.class, args);
		
	}
	
	/*@Autowired
	AccountService accountService;
     
	@Autowired
    public void init(AuthenticationManagerBuilder auth) throws Exception {
		ArrayList<Account> account = accountService.getAllAccounts();
		for (int i=0;i<account.size();i++) {
           
            	auth
                .inMemoryAuthentication()
                    .withUser(account.get(i).getUsername()).password(account.get(i).getPassword()).roles("USER");
            }
        
        
    }*/

	
}
