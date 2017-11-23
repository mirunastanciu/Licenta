package com.test.app.contractclientstatus;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class ContractClinetStatus {

	@Id
	private int idstatus;
	private String statusname;

	public int getIdstatus() {
		return idstatus;
	}

	public void setIdstatus(int idstatus) {
		this.idstatus = idstatus;
	}

	public String getStatusname() {
		return statusname;
	}

	public void setStatusname(String statusname) {
		this.statusname = statusname;
	}

}
