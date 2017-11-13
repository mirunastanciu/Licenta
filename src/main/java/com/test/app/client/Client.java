package com.test.app.client;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="client")
public class Client {

	@Id
	@Column(name="IDCLIENT")
	private int idclent;
	
	@Column(name="CLIENTFIRSTNAME")
	private String fisrtname;
	
	@Column(name="CLIENTLASTNAME")
	private String lastname;
	
	@Column(name="IDACCOUNT")
	private int idaccount;
	
	@Column(name="CLIENTEMAIL")
	private String email;

	public int getIdclent() {
		return idclent;
	}

	public void setIdclent(int idclent) {
		this.idclent = idclent;
	}

	public String getFisrtname() {
		return fisrtname;
	}

	public void setFisrtname(String fisrtname) {
		this.fisrtname = fisrtname;
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

}
