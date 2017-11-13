package com.test.app.employee;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="employee")
public class Employee {

	@Id
	@Column(name="IDEMPLOYEE")
	private int id;
	
	@Column(name="EMPLFIRSTNAME")	
	private String firstname;
	
	@Column(name="EMPLLASTNAME")
	private String lastname;
	
	@Column(name="IDACCOUNT")
	private int idaccount;
	
	@Column(name="EMPLEMAIL")
	private String email;
	
	@Column(name="IDSPECIALISATION")
	private int idspecialisation;
	
	@Column(name="SPECIALISATIONLEVEL")
	private String specialisationlevel;
	
	@Column(name="IDCONTRACT")
	private int idcontract;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public int getIdaccount() {
		return idaccount;
	}

	public void setIdaccount(int idaccount) {
		this.idaccount = idaccount;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getIdspecialisation() {
		return idspecialisation;
	}

	public void setIdspecialisation(int idspecialisation) {
		this.idspecialisation = idspecialisation;
	}

	public String getSpecialisationlevel() {
		return specialisationlevel;
	}

	public void setSpecialisationlevel(String specialisationlevel) {
		this.specialisationlevel = specialisationlevel;
	}

	public int getIdcontract() {
		return idcontract;
	}

	public void setIdcontract(int idcontract) {
		this.idcontract = idcontract;
	}

}
