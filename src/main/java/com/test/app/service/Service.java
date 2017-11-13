package com.test.app.service;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Service {

	@Id
	private int idservice;
	private String neme;
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
