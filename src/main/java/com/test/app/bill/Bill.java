package com.test.app.bill;

import java.sql.Date;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name = "bill")
public class Bill {
	


	@Id
	@Column(name = "IDBILL")
	private int idbill;
	@Column(name = "AMOUNT")
	private double amount;
	@Column(name = "CURENCY")
	private String curency;
	@Column(name = "CREATINDATE")
	private Date creationdate;
	@Column(name = "DUEDATE")
	private Date duedate;
	@Column(name = "IDCONTRACT")
	private int idcontract;
	@Column(name = "PENALTIES")
	private double penalties;
	@Column(name = "IDSTATUS")
	private int idstatus;
	

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

	public int getIdstatus() {
		return idstatus;
	}

	public void setIdstatus(int idstatus) {
		this.idstatus = idstatus;
	}
	
	public String getEmailContent(){
		String content = "The invoice number "+this.getIdbill()+ " with total amount "+this.getAmount()+" EUR, was relesed on "+
						this.getCreationdate()+",and is due on "+this.getDuedate()+"."+"\n"+"\n"+"\n"+"\n"+"\n" ; 
		return content;
	}



}
