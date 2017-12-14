package com.test.app.ticket;
import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface TicketRepository extends CrudRepository<Ticket , String>{

	@Query(value="SELECT * FROM ticket WHERE IDTICKET=?1",nativeQuery=true)
	public Ticket getTicketById(int a);

	@Query(value="SELECT * FROM ticket WHERE IDSTATUS=1;",nativeQuery=true)
	public ArrayList<Ticket> ticketsToDo();

	@Query(value="SELECT * FROM ticket WHERE IDSTATUS=2 OR IDSTATUS=3 OR IDSTATUS=4;",nativeQuery=true)
	public ArrayList<Ticket> ticketsInProgress();

	@Query(value="SELECT * FROM ticket WHERE IDSTATUS=5;",nativeQuery=true)
	public ArrayList<Ticket> ticketsDones();

	@Query(value="SELECT IDTICKET FROM ticket WHERE IDCLIENT =?;",nativeQuery=true)
	public ArrayList<Integer> getIdticketsByIdClient(int a);

}
