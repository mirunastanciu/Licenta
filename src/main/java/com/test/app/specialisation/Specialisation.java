package com.test.app.specialisation;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="specialisation")
public class Specialisation {

	@Id
	@Column(name="IDSPECIALISATION")
	private int idspecialisation;
	@Column(name="SPECIALISATIONNAME")
	private String name;

	public int getIdspecialisation() {
		return idspecialisation;
	}

	public void setIdspecialisation(int idspecialisation) {
		this.idspecialisation = idspecialisation;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
