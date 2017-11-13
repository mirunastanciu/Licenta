package com.test.app.account;

import javax.persistence.Entity;

import javax.persistence.Id;

@Entity
public class Account {
	@Id
	private int idaccount;
	private String username;
	private String password;
	private int idaccounttype;
	private int iddress;

	public int getIdaccount() {
		return idaccount;
	}

	public void setIdaccount(int idaccount) {
		this.idaccount = idaccount;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getIdaccounttype() {
		return idaccounttype;
	}

	public void setIdaccounttype(int idaccounttype) {
		this.idaccounttype = idaccounttype;
	}

	public int getIddress() {
		return iddress;
	}

	public void setIddress(int iddress) {
		this.iddress = iddress;
	}

	
	public boolean validateAdmin(){
		if(this.getIdaccounttype() == 1){
			return true;
			
		}else {
			return false;
		}
	}
	
	public boolean validateClient(){
		if(this.getIdaccounttype() == 2){
			return true;
			
		}else {
			return false;
		}
	}
	
	public boolean validateEmployee(){
		if(this.getIdaccounttype() == 3){
			return true;
			
		}else {
			return false;
		}
	}
}
