package com.test.app.posibionbill;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class BillPosition {

	@Id
	private int idposition;
	private int idbill;
	private int idservice;

	public int getIdposition() {
		return idposition;
	}

	public void setIdposition(int idposition) {
		this.idposition = idposition;
	}

	public int getIdbill() {
		return idbill;
	}

	public void setIdbill(int idbill) {
		this.idbill = idbill;
	}

	public int getIdservice() {
		return idservice;
	}

	public void setIdservice(int idservice) {
		this.idservice = idservice;
	}

}
