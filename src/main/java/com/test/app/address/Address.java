package com.test.app.address;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="address")
public class Address {

	@Id
	@Column(name="IDADDRESS")
	private int idaddress;
	@Column(name="COUNTRY")
	private String country;
	@Column(name="COUNTY")
	private String conuty;
	@Column(name="TOWN")
	private String town;
	@Column(name="STREET")
	private String street;
	@Column(name="STREETNUMBER")
	private int streetnumber;
	@Column(name="BUILDINNUMBER")
	private int buildnumber;
	@Column(name="APARTMENTNUMBER")
	private int apartmentnumber;

	public int getIdaddress() {
		return idaddress;
	}

	public void setIdaddress(int idaddress) {
		this.idaddress = idaddress;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getConuty() {
		return conuty;
	}

	public void setConuty(String conuty) {
		this.conuty = conuty;
	}

	public String getTown() {
		return town;
	}

	public void setTown(String town) {
		this.town = town;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public int getStreetnumber() {
		return streetnumber;
	}

	public void setStreetnumber(int streetnumber) {
		this.streetnumber = streetnumber;
	}

	public int getBuildnumber() {
		return buildnumber;
	}

	public void setBuildnumber(int buildnumber) {
		this.buildnumber = buildnumber;
	}

	public int getApartmentnumber() {
		return apartmentnumber;
	}

	public void setApartmentnumber(int apartmentnumber) {
		this.apartmentnumber = apartmentnumber;
	}

}
