package com.test.app.projecttype;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="projecttype")
public class ProjectType {
	@Id
	@Column(name="IDPROJECTTYPE")
	private int id;
	@Column(name="PROJECTTYPNAME")
	private String projtypename;
	@Column(name="IDSPECIALISATION")
	private int idspecialisation;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getProjtypename() {
		return projtypename;
	}

	public void setProjtypename(String projtypename) {
		this.projtypename = projtypename;
	}

	public int getIdspecialisation() {
		return idspecialisation;
	}

	public void setIdspecialisation(int idspecialisation) {
		this.idspecialisation = idspecialisation;
	}
	
	//custom methods
	
	

}
