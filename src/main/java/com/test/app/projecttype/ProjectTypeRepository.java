package com.test.app.projecttype;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;



public interface ProjectTypeRepository extends CrudRepository<ProjectType , String>{
	
	@Query(value="SELECT IDPROJECTTYPE FROM projecttype WHERE PROJECTTYPNAME=?;",nativeQuery=true)
	public int getIdProjectTypeByName(String a);
}
