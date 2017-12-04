package com.test.app.client;

import org.springframework.data.repository.CrudRepository;

public interface ClientRepository extends CrudRepository<Client , String> {
	
/*	@Query(value="SELECT CLIENTFIRSTNAME FROM client;",nativeQuery=true)
	public ArrayList<String> getClientsFirstName();
	
	@Query(value="SELECT CLIENTLASTNAME FROM client;",nativeQuery=true)
	public ArrayList<String> getClientsLastName();*/
	

}
