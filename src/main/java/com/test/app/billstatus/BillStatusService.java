package com.test.app.billstatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BillStatusService {
	
	@Autowired
	BillStatusRepository billStatusRepository;
	
	
	public String getStatusNameById(int a){
		return billStatusRepository.getStatusNameById(a);
	}

}
