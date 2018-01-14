package com.test.app.posibionbill;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "positionbill")
public class BillPosition {

	@Id
	@Column(name = "IDPOSITION")
	private int idposition;
	@Column(name = "IDBILL")
	private int idbill;
	@Column(name = "IDSERVICE")
	private int idservice;
	@Column(name = "IDTICKET")
	private int idticket;
	@Column(name = "INVPOS")
	private int invpos;

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

	public int getIdticket() {
		return idticket;
	}

	public void setIdticket(int idticket) {
		this.idticket = idticket;
	}

	public int getInvpos() {
		return invpos;
	}

	public void setInvpos(int invpos) {
		this.invpos = invpos;
	}

}
