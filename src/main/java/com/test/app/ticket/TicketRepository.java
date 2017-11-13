package com.test.app.ticket;

import org.springframework.data.repository.CrudRepository;



public interface TicketRepository extends CrudRepository<Ticket , String>{


	/*@Query(value="SELECT ticket.IDTICKET , ticket.DESCRIPTION ,projecttype.PROJECTTYPNAME , ticket.DUEDATE , statusticket.STATUSNAME FROM	 (( ticket INNER JOIN `hdo-db`.projecttype ON  ticket.IDPROJECTTYPE= projecttype.IDPROJECTTYPE) INNER JOIN `hdo-db`.statusticket ON  ticket.IDSTATUS= statusticket.IDSTATUS) WHERE ticket.IDSTATUS = 1;",nativeQuery=true)
	public ArrayList<TicketTableInfo> infoTable();*/

	
}
