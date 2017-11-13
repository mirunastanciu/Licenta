package com.test.app.billstatus;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class BillStatus {

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
