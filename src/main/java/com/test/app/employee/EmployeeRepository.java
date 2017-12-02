package com.test.app.employee;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee , String>{
	
	//not used
	@Query(value="SELECT IDEMPLOYEE FROM employee WHERE EMPLFIRSTNAME=?1 AND EMPLLASTNAME=?2;",nativeQuery=true)
	public int getIdEmployeeByName(String a,String b);
	
	@Query(value="SELECT * FROM employee WHERE IDEMPLOYEE=?;",nativeQuery=true)
	public Employee getEmployeeById(int id);
	
	
	
	
	

}
