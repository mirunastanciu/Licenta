package com.test.app.account;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
	
	@Autowired
	private AccountRepository accountRepository;

	public ArrayList<Account> getAllAccounts() {
		ArrayList<Account> accountsList = new ArrayList<>();
		accountRepository.findAll()
		.forEach(accountsList::add);
		
		return accountsList;
	}
	
	public Account addAccount(Account account){
		return accountRepository.save(account);
	}
	

}
