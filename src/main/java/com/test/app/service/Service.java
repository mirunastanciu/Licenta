package com.test.app.service;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="service")
public class Service {

	@Id
	@Column(name="IDSERVICE")
	private int idservice;
	@Column(name="SERVICENAME")
	private String neme;
	@Column(name="PRICE")
	private double price;

	public int getIdservice() {
		return idservice;
	}

	public void setIdservice(int idservice) {
		this.idservice = idservice;
	}

	public String getNeme() {
		return neme;
	}

	public void setNeme(String neme) {
		this.neme = neme;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

}
