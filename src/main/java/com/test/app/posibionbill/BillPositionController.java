package com.test.app.posibionbill;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.test.app.service.ServiceService;

@RestController
public class BillPositionController {

	@Autowired
	BillPositionService billPositionService;

	@Autowired
	ServiceService serviceService;



	@RequestMapping(path = "/getBillPositions" , method=RequestMethod.POST)
	public ArrayList<BillPositionDetails> getBillPosition(@RequestParam(value="invoiceId") int id){

		ArrayList<BillPosition> posList =  billPositionService.getAllPosPerBill(id);
		ArrayList<BillPositionDetails> posListDetails = new ArrayList<>();

		for(int i=0;i<posList.size();i++){
			BillPositionDetails bpd = new BillPositionDetails();

			bpd.setServicename(serviceService.getServiceById(posList.get(i).getIdservice()).getNeme());
			bpd.setPrice(serviceService.getServiceById(posList.get(i).getIdservice()).getPrice());
			bpd.setCurrency("EUR");
			bpd.setIdticket(posList.get(i).getIdticket());

			posListDetails.add(bpd);

		}

		return posListDetails;
	}

	@RequestMapping(path = "/totalInvoice" , method=RequestMethod.POST)
	public double getTotal(@RequestParam(value="invoiceId") int id){
		double total =0;

		ArrayList<BillPosition> posList =  billPositionService.getAllPosPerBill(id);
		for(int i=0;i<posList.size();i++){
			double price = serviceService.getServiceById(posList.get(i).getIdservice()).getPrice();
			total = total+price;
		}

		return total;

	}

	@RequestMapping(path = "/saveBillPosition" , method = RequestMethod.POST)
	public void Saveposition(@RequestParam(value = "servicename") String servicename ,
							 @RequestParam(value = "idticket") int idticket) {

		BillPosition pb = new BillPosition();

		pb.setIdbill(0);
		pb.setIdservice(serviceService.getIdServiceByName(servicename));
		pb.setIdticket(idticket);

		billPositionService.save(pb);

	}
	
	@RequestMapping(path = "/deleteDraft", method = RequestMethod.POST)
	public String deleteDraft(@RequestParam(value="del") String del){
		if(del.equals("delete")){
			ArrayList<BillPosition> bp = billPositionService.getBillPostByIdBill0();
			for(int i=0;i<bp.size();i++){
				billPositionService.delete(bp.get(i));
			}
		}
		return "http://localhost:8080/invoicePage";
		
	}




}
