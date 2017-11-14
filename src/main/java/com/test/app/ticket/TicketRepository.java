package com.test.app.ticket;

import org.springframework.data.repository.CrudRepository;



public interface TicketRepository extends CrudRepository<Ticket , String>{


	/*@Query(value="SELECT ticket.IDTICKET , ticket.DESCRIPTION ,projecttype.PROJECTTYPNAME , ticket.DUEDATE , statusticket.STATUSNAME FROM	 (( ticket INNER JOIN `hdo-db`.projecttype ON  ticket.IDPROJECTTYPE= projecttype.IDPROJECTTYPE) INNER JOIN `hdo-db`.statusticket ON  ticket.IDSTATUS= statusticket.IDSTATUS) WHERE ticket.IDSTATUS = 1;",nativeQuery=true)
	public ArrayList<TicketTableInfo> infoTable();*/
 
	/*@Query(value="UPDATE ticket SET DESCRIPTION = :description,IDPROJECTTYPE=:projecttype,IDEMPLOYEE=:employeename,DUEDATE=:duedate,STARTDATE=:startdate,FINISHDATE=:finishdate , IDSTATUS= status WHERE IDTICKET = :id",nativeQuery=true)
	public Ticket update(@Param("id") int id , @Param("projecttype") int projecttype ,@Param("status") int status ,@Param("description") String description ,
			@Param("duedate") Date duedate ,@Param("startdate") Date startdate ,@Param("finishdate") Date finishdate ,
			@Param("employeename")int employeename);*/
	
	
}
