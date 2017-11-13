package com.test.app.account;

import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, String>{
	//ArrayList<Account> getAllAccounts();
	

}
