package com.test.app.ticketstatus;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.app.employee.Employee;

@Service
public class TicketStatusService {

	@Autowired
	TicketStatusRepository ticketStatusRepository;


	public ArrayList<TicketStatus> getAllTicketStatuses(){
		ArrayList<TicketStatus> l = new ArrayList<>();
		ticketStatusRepository.findAll().forEach(l::add);
		return l;
	}


	public TicketStatus getTicketStatusById(int a){
		ArrayList<TicketStatus> l = getAllTicketStatuses();
		 for(int i=0;i<l.size();i++){
			 if(l.get(i).getIdstatus() == a){
				 return l.get(i);
			 }
		 }
		return null;
	}

	public  int getStatusIdByName(String a){
		ArrayList<TicketStatus> e = getAllTicketStatuses();
		 for(int i=0;i<e.size();i++){
			 if(e.get(i).getStatusname().equals(a)){
				 return e.get(i).getIdstatus();
			 }
		 }
		return 0;
	}



}
