package com.test.app.bill;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface BillRepository extends CrudRepository<Bill , String>{
	
	@Query(value="SELECT * FROM bill WHERE IDSTATUS=2",nativeQuery=true)
	public ArrayList<Bill> getAllUnpaidInvoices();
	
	@Query(value="SELECT * FROM bill WHERE IDSTATUS=1",nativeQuery=true)
	public ArrayList<Bill> getAllPaidInvoices();
	
	@Query(value="SELECT * FROM bill WHERE IDBILL=?",nativeQuery=true)
	public Bill getBillById(int a);
	
	@Query(value="SELECT IDBILL FROM bill ORDER BY IDBILL DESC LIMIT 1;",nativeQuery=true)
	public int getLastBillId();
	
	
	
	

}
