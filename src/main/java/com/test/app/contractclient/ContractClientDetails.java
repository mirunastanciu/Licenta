package com.test.app.contractclient;

import java.sql.Date;

public class ContractClientDetails {

	private int id;
	private String status;
	private double amount;
	private String curency;
	private Date startdate;
	private String expirationdate;
	private Date signdate;

	public int getId() {
		return id;
	}

	public void setId(int idstatus) {
		this.id = idstatus;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getCurency() {
		return curency;
	}

	public void setCurency(String curency) {
		this.curency = curency;
	}

	public Date getStartdate() {
		return startdate;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	public String getExpirationdate() {
		return expirationdate;
	}

	public void setExpirationdate(String expirationdate) {
		this.expirationdate = expirationdate;
	}

	public Date getSigndate() {
		return signdate;
	}

	public void setSigndate(Date signdate) {
		this.signdate = signdate;
	}



}
