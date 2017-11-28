package com.test.app.contractemployee;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "contractemployee")
public class ContractEmployee {

	@Id
	@Column(name = "IDCONTRACTEMPLOYEE")
	private int id;
	@Column(name = "IDSTATUS")
	private int idstatus;
	@Column(name = "SALARY")
	private double salary;
	@Column(name = "SIGNATUREDATE")
	private Date signature;
	@Column(name = "STARTDATE")
	private Date startdate;
	@Column(name = "EXPIRATIONDATE")
	private Date expirationdate;
	@Column(name = "CURENCY")
	private String curency;

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

	public double getSalary() {
		return salary;
	}

	public void setSalary(double salary) {
		this.salary = salary;
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

	public String getCurency() {
		return curency;
	}

	public void setCurency(String curency) {
		this.curency = curency;
	}

}
