package com.test.app.contractclientstatus;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="statuscontractclient")
public class ContractClientStatus {

	@Id
	@Column(name="IDSTATUS")
	private int idstatus;
	@Column(name="STATUSNAME")
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
