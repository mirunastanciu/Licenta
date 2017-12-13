package com.test.app.posibionbill;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface BillPositionRepository extends CrudRepository<BillPosition, String>{
	
	@Query(value="SELECT * FROM positionbill WHERE IDBILL=?;", nativeQuery =true)
	public ArrayList<BillPosition> getBillPosByIdBill(int a);

}
