package com.test.app.ticket;

import org.springframework.data.repository.CrudRepository;



public interface TicketRepository extends CrudRepository<Ticket , String>{




	/*@Query("SELECT ticket.IDTICKET , ticket.DESCRIPTION ,projecttype.PROJECTTYPNAME , ticket.DUEDATE , statusticket.STATUSNAME FROM	  ticket INNER JOIN projecttype ON  ticket.IDPROJECTTYPE= projecttype.IDPROJECTTYPE INNER JOIN statusticket ON  ticket.IDSTATUS= statusticket.IDSTATUS WHERE ticket.IDSTATUS = 1;")
     public List<Ticket> todo();*/
}
