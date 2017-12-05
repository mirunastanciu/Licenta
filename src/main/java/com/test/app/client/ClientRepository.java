package com.test.app.client;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ClientRepository extends CrudRepository<Client , String> {
	
	@Query(value="SELECT * FROM client WHERE IDCLIENT=?;",nativeQuery=true)
    public Client getClientById(int a);
	

}
