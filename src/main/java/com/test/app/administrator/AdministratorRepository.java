package com.test.app.administrator;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface AdministratorRepository extends CrudRepository<Administrator, String> {
	
	@Query(value = "SELECT ADMINEMAIL FROM administrator WHERE IDADMIN = 1;",nativeQuery=true)
	public String getAdminMail();
	
	@Query(value="SELECT ADMINFIRSTNAME FROM administrator WHERE IDACCOUNT = (SELECT IDACCOUNT FROM account WHERE USERNAME=?)",nativeQuery=true)
	public String getAdminFNameByUsername(String a);
	
	@Query(value="SELECT ADMINLASTNAME FROM administrator WHERE IDACCOUNT = (SELECT IDACCOUNT FROM account WHERE USERNAME=?)",nativeQuery=true)
	public String getAdminLNameByUsername(String a);
	

	
	
	
	

}
