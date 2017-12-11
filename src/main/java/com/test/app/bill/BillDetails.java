package com.test.app.bill;

import java.sql.Date;
import java.util.ArrayList;

public class BillDetails {

	private int idbill;
	private double amount;
	private String curency;
	private Date creationdate;
	private Date duedate;
	private int idcontract;
	private double penalties;
	private String status;
	
	private ArrayList<Integer> Services ;
	
	

	public int getIdbill() {
		return idbill;
	}

	public void setIdbill(int idbill) {
		this.idbill = idbill;
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

	public Date getCreationdate() {
		return creationdate;
	}

	public void setCreationdate(Date creationdate) {
		this.creationdate = creationdate;
	}

	public Date getDuedate() {
		return duedate;
	}

	public void setDuedate(Date duedate) {
		this.duedate = duedate;
	}

	public int getIdcontract() {
		return idcontract;
	}

	public void setIdcontract(int idcontract) {
		this.idcontract = idcontract;
	}

	public double getPenalties() {
		return penalties;
	}

	public void setPenalties(double penalties) {
		this.penalties = penalties;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String idstatus) {
		this.status = idstatus;
	}

	public ArrayList<Integer> getServices() {
		return Services;
	}

	public void setServices(ArrayList<Integer> services) {
		Services = services;
	}
	
	

}
