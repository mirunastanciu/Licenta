package com.test.app.account;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
	
	@Autowired
	AccountRepository accountRepository;

	public ArrayList<Account> getAllAccounts() {
		ArrayList<Account> accountsList = new ArrayList<>();
		accountRepository.findAll()
		.forEach(accountsList::add);
		
		return accountsList;
	}
	
	public void saveAccount(Account account){
		 accountRepository.save(account);
	}
	
	public String getUsernameByIdAccount(int a){
		return accountRepository.getUsernameByIdAccount(a);
	}
	
	public int getIdAddressByIdAccount(int a){
		return accountRepository.getIdAddressByIdAccount(a);
	}
	
	
	

}
