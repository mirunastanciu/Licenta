package com.test.app.accounttype;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class AccountType {

	@Id
	private int idaccounttype;
	private String accounttypename;

	public int getIdaccounttype() {
		return idaccounttype;
	}

	public void setIdaccounttype(int idaccounttype) {
		this.idaccounttype = idaccounttype;
	}

	public String getAccounttypename() {
		return accounttypename;
	}

	public void setAccounttypename(String accounttypename) {
		this.accounttypename = accounttypename;
	}

}
