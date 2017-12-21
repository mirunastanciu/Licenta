package com.test.app.bill;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BillService {
	
	@Autowired
	BillRepository billRepository;
	
	
	public ArrayList<Bill> getAllUnpaidInvoices(){
		ArrayList<Bill> invoices = new ArrayList<>();
		billRepository.getAllUnpaidInvoices().forEach(invoices::add);
		return invoices;
	}
	
	public ArrayList<Bill> getAllPaidInvoices(){
		ArrayList<Bill> invoices = new ArrayList<>();
		billRepository.getAllPaidInvoices().forEach(invoices::add);
		return invoices;
	}
	
	public Bill getBillByID(int a){
		return billRepository.getBillById(a);
	}
	
	public void save(Bill b){
		billRepository.save(b);
	}
	
	public int lastBillId(){
		return billRepository.getLastBillId();
	}
	
	public ArrayList<Bill> getBillsPaiedByIdContract(int a){
		return billRepository.getBillsPiedByIdContract(a);
	}
	
	public void delete(Bill b){
		billRepository.delete(b);
	}
	

}
