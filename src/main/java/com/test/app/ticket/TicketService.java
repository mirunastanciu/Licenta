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
		return ticketRepository.getTicketById(a);
		/*ArrayList<Ticket> t = getAllTickets() ;
		 for(int i=0;i<t.size();i++){
			 if(t.get(i).getId() == a){
				 return t.get(i);
			 }
		 }
		return null;*/
	}

	public void delete(Ticket t){
		ticketRepository.delete(t);

	}

	public ArrayList<Ticket> getTicketsToDo(){
		return ticketRepository.ticketsToDo();
	}

	public ArrayList<Ticket> getTicketsInProgress(){
		return ticketRepository.ticketsInProgress();
	}

	public ArrayList<Ticket> getTicketsDone(){
		return ticketRepository.ticketsDones();
	}

	public ArrayList<Integer> getTicketsIdByIdClient(int a){
		return ticketRepository.getIdticketsByIdClient(a);
	}
	
	public void deleteTicketsByIdClient(int a){
		ticketRepository.deleteAllTicketsByIdClient(a);
	}

    public ArrayList<Ticket> getTicketsToDoByIdClient(int a){
    	return ticketRepository.getTicketsToDoByIdClient(a);
    }
    
    public ArrayList<Ticket> getTicketsInProgressByIdClient(int a){
    	return ticketRepository.getTicketsInProgressByIdClient(a);
    }
    
    public ArrayList<Ticket> getTicketsDoneByIdClient(int a){
    	return ticketRepository.getTicketsDoneByIdClient(a);
    }
    
    public ArrayList<Ticket> getTicketsToDoByIdEmp(int a ){
    	return ticketRepository.getTicketsToDoByIdEmp(a);
    }
    
    public ArrayList<Ticket> getTicketsAssignedByIdEmp(int a ){
    	return ticketRepository.getTicketsAssigneByIdEmp(a);
    }


}
