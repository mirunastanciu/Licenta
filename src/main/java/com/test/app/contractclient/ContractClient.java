package com.test.app.contractclient;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="contractclient")
public class ContractClient {

	@Id
	@Column(name="IDCONTRACTCLIENT")
	private int id;
	@Column(name="IDSTATUS")
	private int idstatus;
	@Column(name="CONTRACTAMOUNT")
	private double amount;
	@Column(name="CONTRACTCURENCY")
	private String curency;
	@Column(name="IDCLIENT")
	private int idclient;
	@Column(name="SIGNATUREDATE")
	private Date signature;
	@Column(name="STARTDATE")
	private Date startdate;
	@Column(name="EXPIRATIONDATE")
	private Date expirationdate;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getIdstatus() {
		return idstatus;
	}

	public void setIdstatus(int idstatus) {
		this.idstatus = idstatus;
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

	public int getIdclient() {
		return idclient;
	}

	public void setIdclient(int idclient) {
		this.idclient = idclient;
	}

	public Date getSignature() {
		return signature;
	}

	public void setSignature(Date signature) {
		this.signature = signature;
	}

	public Date getStartdate() {
		return startdate;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	public Date getExpirationdate() {
		return expirationdate;
	}

	public void setExpirationdate(Date expirationdate) {
		this.expirationdate = expirationdate;
	}

}
