package com.test.app.ticketstatus;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TicketStatusController {
	
	@Autowired
	TicketStatusService ticketStatusService;
	
	@RequestMapping(path="/getAllTicketsStatuses" , method=RequestMethod.GET)
	public ArrayList<TicketStatus> getAlltichetStatuses(){
		return ticketStatusService.getAllTicketStatuses();
	}
	
	
	@RequestMapping(path="/getAllTicketStatusNames" , method=RequestMethod.GET)
	public ArrayList<String> getAllTicketStatusNames(){
		ArrayList<TicketStatus> l = getAlltichetStatuses();
		ArrayList<String> result = new ArrayList<>();
		for(int i=0;i<l.size();i++){
			result.add(l.get(i).getStatusname());
		}
		return result;
		
		
	}

}
