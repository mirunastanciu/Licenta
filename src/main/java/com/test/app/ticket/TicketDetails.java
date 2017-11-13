package com.test.app.ticket;

import java.util.Date;

public class TicketDetails {

	private int idticket;
	private String description;
	private String projecttypename;
	private String status;
	private String employeename;
	private String employeespecialisation;
	private String employeeemail;
	private Date creationdate;
	private Date duedate;
	private Date startdate;
	private Date finishdate;
	private String clientname;
	private String clientemail;

	public int getIdticket() {
		return idticket;
	}

	public void setIdticket(int idticket) {
		this.idticket = idticket;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getProjecttypename() {
		return projecttypename;
	}

	public void setProjecttypename(String projecttypename) {
		this.projecttypename = projecttypename;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getEmployeename() {
		return employeename;
	}

	public void setEmployeename(String employeename) {
		this.employeename = employeename;
	}

	public String getEmployeespecialisation() {
		return employeespecialisation;
	}

	public void setEmployeespecialisation(String employeespecialisation) {
		this.employeespecialisation = employeespecialisation;
	}

	public String getEmployeeemail() {
		return employeeemail;
	}

	public void setEmployeeemail(String employeeemail) {
		this.employeeemail = employeeemail;
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

	public String getClientname() {
		return clientname;
	}

	public void setClientname(String clientname) {
		this.clientname = clientname;
	}

	public String getClientemail() {
		return clientemail;
	}

	public void setClientemail(String clientemail) {
		this.clientemail = clientemail;
	}

}
