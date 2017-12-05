package com.test.app.client;

import java.sql.Date;

public class ClientDetails {

	private int id;
	private String name;
	private String email;
	private String username;
	private String address;

	private int idcontract;
	private double amount;
	private double availabeamount;
	private String curency;
	private Date startdate;
	private String contractstatus;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getIdcontract() {
		return idcontract;
	}

	public void setIdcontract(int idcontract) {
		this.idcontract = idcontract;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public double getAvailabeamount() {
		return availabeamount;
	}

	public void setAvailabeamount(double availabeamount) {
		this.availabeamount = availabeamount;
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getContractstatus() {
		return contractstatus;
	}

	public void setContractstatus(String contractstatus) {
		this.contractstatus = contractstatus;
	}
	
	

}
