package com.test.app.client;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ClientRepository extends CrudRepository<Client , String> {
	
	@Query(value="SELECT * FROM client WHERE IDCLIENT=?;",nativeQuery=true)
    public Client getClientById(int a);
	
	@Query(value=" SELECT * FROM client WHERE IDCLIENT= (SELECT IDCLIENT FROM contractclient WHERE IDCONTRACTCLIENT = (SELECT IDCONTRACT FROM bill WHERE IDBILL=?))",nativeQuery=true)
	public Client getClientByIdBill(int a);
	
	@Query(value="SELECT IDCLIENT FROM client WHERE IDACCOUNT = (SELECT IDACCOUNT FROM account WHERE USERNAME=?)",nativeQuery=true)
	public int getIdClientByUsername(String a);
	
	@Query(value="SELECT CLIENTFIRSTNAME FROM client WHERE IDACCOUNT = (SELECT IDACCOUNT FROM account WHERE USERNAME=?)",nativeQuery=true)
	public String getClientFNameByUsername(String a);
	
	@Query(value="SELECT CLIENTLASTNAME FROM client WHERE IDACCOUNT = (SELECT IDACCOUNT FROM account WHERE USERNAME=?)",nativeQuery=true)
	public String getClientLNameByUsername(String a);
	
	@Query(value="UPDATE client SET CLIENTFIRSTNAME = ?, CLIENTLASTNAME = ?, CLIENTEMAIL = ? WHERE IDCLIENT = ?;",nativeQuery=true)
	public void updateClientMyAcc(String fname, String lname,String email,int id);
	
	
	
	
}
