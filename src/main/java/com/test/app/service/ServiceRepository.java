package com.test.app.service;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ServiceRepository extends CrudRepository<Service , String>{
	
	@Query(value="SELECT * FROM service WHERE IDSERVICE=?",nativeQuery=true)
	public Service getServiceById(int a);

}
