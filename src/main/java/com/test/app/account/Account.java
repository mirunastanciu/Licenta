package com.test.app.account;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="account")
public class Account {
	@Id
	@Column(name="IDACCOUNT")
	private int idaccount;
	@Column(name="USERNAME")
	private String username;
	@Column(name="PASSWORD")	
	private String password;
	@Column(name="IDACCOUNTTYPE")
	private int idaccounttype;
	@Column(name="IDADDRESS")
	private int idadress;
	

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
		return idadress;
	}

	public void setIddress(int iddress) {
		this.idadress = iddress;
	}

	
	
	

	
	
	
}
