package com.test.app.bill;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test.app.billstatus.BillStatusService;

@RestController
public class BillController {

	@Autowired
	BillService billService;

	@Autowired
	BillStatusService billStatusService;


	@RequestMapping(value ="/getAllUnpaidInvoices" , method = RequestMethod.GET)
	public ArrayList<BillDetails> getAllUnpaidInvoices(){
		ArrayList<Bill> unpaidInvoice =  billService.getAllUnpaidInvoices();
		ArrayList<BillDetails> unpaidInvoiceD = new ArrayList<>();
		for(int i=0;i<unpaidInvoice.size();i++){
			BillDetails bd = new BillDetails();

			bd.setAmount(unpaidInvoice.get(i).getAmount());
			bd.setCreationdate(unpaidInvoice.get(i).getCreationdate());
			bd.setCurency(unpaidInvoice.get(i).getCurency());
			bd.setDuedate(unpaidInvoice.get(i).getDuedate());
			bd.setIdbill(unpaidInvoice.get(i).getIdbill());
			bd.setIdcontract(unpaidInvoice.get(i).getIdcontract());
			bd.setPenalties(unpaidInvoice.get(i).getPenalties());
			bd.setStatus(billStatusService.getStatusNameById(unpaidInvoice.get(i).getIdstatus()));

			unpaidInvoiceD.add(bd);
		}
		return unpaidInvoiceD;
	}

	@RequestMapping(value ="/getAllPaidInvoices" , method = RequestMethod.GET)
	public ArrayList<BillDetails> getAllPaidInvoices(){
		ArrayList<Bill> paidInvoice =  billService.getAllPaidInvoices();
		ArrayList<BillDetails> paidInvoiceD = new ArrayList<>();
		for(int i=0;i<paidInvoice.size();i++){
			BillDetails bd = new BillDetails();

			bd.setAmount(paidInvoice.get(i).getAmount());
			bd.setCreationdate(paidInvoice.get(i).getCreationdate());
			bd.setCurency(paidInvoice.get(i).getCurency());
			bd.setDuedate(paidInvoice.get(i).getDuedate());
			bd.setIdbill(paidInvoice.get(i).getIdbill());
			bd.setIdcontract(paidInvoice.get(i).getIdcontract());
			bd.setPenalties(paidInvoice.get(i).getPenalties());
			bd.setStatus(billStatusService.getStatusNameById(paidInvoice.get(i).getIdstatus()));

			paidInvoiceD.add(bd);
		}
		return paidInvoiceD;
	}

	@RequestMapping(path = "/getInvoiceInfo", method = RequestMethod.POST)
	public Bill getBillDetails(@RequestParam(value="invoiceId") int id){
		return billService.getBillByID(id);

	}

	@RequestMapping(path = "/saveInvoice",  method = RequestMethod.POST)
	public void saveInvoice() {

	}


}
