package com.test.app.posibionbill;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BillPositionService {

	@Autowired
	BillPositionRepository billPositionRepository;

	public ArrayList<BillPosition> getAllPosPerBill(int a){
		ArrayList<BillPosition> pb = new ArrayList<>();
		billPositionRepository.getBillPosByIdBill(a).forEach(pb::add);
	 return pb;
	}

	public void save(BillPosition bp) {
		billPositionRepository.save(bp);
	}
	
	public ArrayList<BillPosition> getBillPostByIdBill0() {
		return billPositionRepository.getBillPosByIdBill0();
	}
	
	public void delete(BillPosition bp){
		billPositionRepository.delete(bp);
	}
	
	public BillPosition getBillPosDraftByInvpos(int a){
		return billPositionRepository.getBillPosDraftByInvpos(a);
	}
}
