package com.test.app.address;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface AddressRepository extends CrudRepository<Address , String>{
	
	@Query(value="SELECT * FROM address WHERE IDADDRESS=?;",nativeQuery=true)
	public Address getAddresById(int a);
	

}
