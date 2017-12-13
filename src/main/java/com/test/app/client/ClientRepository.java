package com.test.app.client;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ClientRepository extends CrudRepository<Client , String> {
	
	@Query(value="SELECT * FROM client WHERE IDCLIENT=?;",nativeQuery=true)
    public Client getClientById(int a);
	
	@Query(value=" SELECT * FROM client WHERE IDCLIENT= (SELECT IDCLIENT FROM contractclient WHERE IDCONTRACTCLIENT = (SELECT IDCONTRACT FROM bill WHERE IDBILL=?))",nativeQuery=true)
	public Client getClientByIdBill(int a);
	

}
