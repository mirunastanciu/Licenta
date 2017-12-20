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

	public boolean existAccountById(int a){
		boolean exist = false;
		ArrayList<Account> ac = getAllAccounts();
		for(int i=0;i<ac.size();i++){
			if(ac.get(i).getIdaccount() == a){
				exist = true;
			}
		}
		return exist;

	}

	public boolean existAccountByUsername(String a){
		boolean exist = false;

			ArrayList<Account> ac = getAllAccounts();
			for(int i=0;i<ac.size();i++){
				if(ac.get(i).getUsername().equals(a)){
					exist = true;
				}
			}
			return exist;

	}

	public Account getAccountById(int a){
		return accountRepository.getAccountByIdAccount(a);




	}


	public void delete(Account a) {
		accountRepository.delete(a);
	}



}
