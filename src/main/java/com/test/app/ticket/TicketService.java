package com.test.app.ticket;

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
	
	public  Ticket getTicketById(int a){
		ArrayList<Ticket> t = getAllTickets() ;
		 for(int i=0;i<t.size();i++){
			 if(t.get(i).getId() == a){
				 return t.get(i);
			 }
		 }
		return null;
	}
	
	
	

}
