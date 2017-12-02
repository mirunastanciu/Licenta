package com.test.app.account;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, String>{
	
	@Query(value="SELECT USERNAME FROM account WHERE IDACCOUNT=?;",nativeQuery=true)
	public String getUsernameByIdAccount(int a);
	
	@Query(value="SELECT IDADDRESS FROM account WHERE IDACCOUNT=?;",nativeQuery=true)
	public int getIdAddressByIdAccount(int a);
	

}
