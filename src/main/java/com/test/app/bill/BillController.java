package com.test.app.bill;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test.app.billstatus.BillStatusService;
import com.test.app.client.ClientService;
import com.test.app.contractclient.ContractClientService;
import com.test.app.mail.Mail;
import com.test.app.mail.MailService;
import com.test.app.posibionbill.BillPosition;
import com.test.app.posibionbill.BillPositionService;
import com.test.app.service.ServiceService;

@RestController
public class BillController {

	@Autowired
	BillService billService;

	@Autowired
	BillStatusService billStatusService;

	@Autowired
	ClientService clientService;

	@Autowired
	ContractClientService contractClientService;

	@Autowired
	BillPositionService billPositionService;

	@Autowired
    private MailService emailService;

	@Autowired
	ServiceService serviceService;



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
	public String saveInvoice(@RequestParam(value="clientname") String clientname,
							  @RequestParam(value="duedate") String duedate,
							  @RequestParam(value="total") double total) {

		Bill bill = new Bill();

		bill.setAmount(total);
		bill.setCurency("EUR");
		bill.setCreationdate(Date.valueOf(LocalDate.now()));
		java.sql.Date parseDate = java.sql.Date.valueOf(duedate);
		bill.setDuedate(parseDate);
		bill.setIdstatus(2);//unpaid
		bill.setPenalties(0);
		bill.setIdcontract(contractClientService.getIdContractByIdClient(clientService.getClientIdByName(clientname)));

		billService.save(bill);

		ArrayList<BillPosition> billposDraft = billPositionService.getBillPostByIdBill0();

		for(int i=0;i<billposDraft.size();i++){
		     billposDraft.get(i).setIdbill(billService.lastBillId());
		     billPositionService.save(billposDraft.get(i));
		}

		Mail mail = new Mail();
        mail.setFrom("miruna.anna@gmail.com");
        mail.setTo(clientService.getClientById(clientService.getClientIdByName(clientname)).getEmail());
        mail.setSubject("New Invoice");
        String content = billService.getBillByID(billService.lastBillId()).getEmailContent();
        ArrayList<BillPosition> billpos = billPositionService.getAllPosPerBill(billService.lastBillId());
		for(int i=0;i<billpos.size();i++){
			content = content + billpos.get(i).getIdticket()+"       "+
					  serviceService.getServiceById(billpos.get(i).getIdservice()).getPrice()+
					  " "+"EUR"+"       "+serviceService.getServiceById(billpos.get(i).getIdservice()).getNeme()+"\n";
		}
        mail.setContent(content);

        emailService.sendSimpleMessage(mail);


		return "http://localhost:8080/invoicePage";

	}





}
