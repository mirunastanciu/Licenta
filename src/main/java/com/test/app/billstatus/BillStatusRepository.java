package com.test.app.billstatus;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface BillStatusRepository extends CrudRepository<BillStatus , String>{
	
	@Query(value="SELECT STATUSNAME FROM statusbill WHERE IDSTATUS =?",nativeQuery=true)
	public String getStatusNameById(int a); 

}
