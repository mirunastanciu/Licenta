package com.test.app.ticket;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="ticket")
public class Ticket {
	
	@Id
	@Column(name="IDTICKET")
	private int id;
	@Column(name="DESCRIPTION")
	private String description;
	@Column(name="IDPROJECTTYPE")
	private int projcttype;
	@Column(name="IDEMPLOYEE")
	private int idemployee;
	@Column(name="IDCLIENT")
	private int idclient;
	@Column(name="CREATIONDATE")
	private Date creationdate;
	@Column(name="DUEDATE")
	private Date duedate;
	@Column(name="STARTDATE")
	private Date startdate;
	@Column(name="FINISHDATE")
	private Date finishdate;
	@Column(name="IDSTATUS")
	private int idstatus;
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getProjcttype() {
		return projcttype;
	}

	public void setProjcttype(int projcttype) {
		this.projcttype = projcttype;
	}

	public int getIdemployee() {
		return idemployee;
	}

	public void setIdemployee(int idemployee) {
		this.idemployee = idemployee;
	}

	public int getIdclient() {
		return idclient;
	}

	public void setIdclient(int idclient) {
		this.idclient = idclient;
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

	public Date getStartdate() {
		return startdate;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	public Date getFinishdate() {
		return finishdate;
	}

	public void setFinishdate(Date finishdate) {
		this.finishdate = finishdate;
	}

	public int getIdstatus() {
		return idstatus;
	}

	public void setIdstatus(int idstatus) {
		this.idstatus = idstatus;
	}
	
	public String getTicket(){
		return this.getDescription();
	}
	
	//custom methods
	
	
	
	

	
}
