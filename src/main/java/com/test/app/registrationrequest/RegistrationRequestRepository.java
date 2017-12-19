package com.test.app.registrationrequest;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface RegistrationRequestRepository extends CrudRepository<RegistrationRequest, String> {
	
	@Query(value="SELECT SECURENUMBER FROM registrationrequest WHERE IDREQUEST=?;",nativeQuery=true)
	public int getSecureCodeByIdRequest(int a);
	
	@Query(value="SELECT * FROM registrationrequest WHERE IDREQUEST=?;",nativeQuery=true)
	public RegistrationRequest getRegistrationRequestById(int a);
	
	@Query(value="SELECT * FROM registrationrequest WHERE STATUS = ?;",nativeQuery=true)
	public ArrayList<RegistrationRequest> getRegistrationRequestByStatus(String a);
	
	
	
	

}
