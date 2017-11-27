package com.test.app.ticket;

import java.sql.Date;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketService {
	
	@Autowired
	TicketRepository ticketRepository;
	
	
	
	public ArrayList<Ticket> getAllTickets(){
		ArrayList<Ticket> ticketsList = new ArrayList<>();
		ticketRepository.findAll()
		.forEach(ticketsList::add);
		
		return ticketsList;
	}
	
	
	
	public Ticket addTicket(Ticket tichet){
		return ticketRepository.save(tichet);
	}
	
	/*public Ticket updateTicket(int a , int projecttype , int status , String description , Date duedate , 
			Date startdate , Date finishdate ,int employeename){
		Ticket t = getTicketById(a);
		
		t.setProjcttype(projecttype);
		t.setIdstatus(status);
		t.setDescription(description);
		t.setDuedate(duedate);
		t.setStartdate(startdate);
		t.setFinishdate(finishdate);
		t.setIdemployee(employeename);
		
		
		return t;
		
		
	}*/
	/*public Ticket update(){
		return ticketRepository.update(id, projecttype, status, description, duedate, startdate, finishdate, employeename);
	}*/
	
	/*public  void update1(int id , Ticket ticket){
		ticketRepository.save(ticket);
	}*/
	
	
	
	
	public  Ticket getTicketById(int a){
		ArrayList<Ticket> t = getAllTickets() ;
		 for(int i=0;i<t.size();i++){
			 if(t.get(i).getId() == a){
				 return t.get(i);
			 }
		 }
		return null;
	}
	
	public void delete(Ticket t){
		ticketRepository.delete(t);
		
	}
	
	
	

}
