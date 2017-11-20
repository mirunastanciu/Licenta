package com.test.app.employee;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	public ArrayList<Employee> getAllEmployies(){
		ArrayList<Employee> l = new ArrayList<>();
		employeeRepository.findAll().forEach(l::add);
		return l;
	}
	

	public  Employee getEmployeeById(int a){
		ArrayList<Employee> e = getAllEmployies();
		 for(int i=0;i<e.size();i++){
			 if(e.get(i).getId() == a){
				 return e.get(i);
			 }
		 }
		return null;
	}
	
	public  Employee getEmployeeByName(String a){
		ArrayList<Employee> e = getAllEmployies();
		 for(int i=0;i<e.size();i++){
			 String b = e.get(i).getFirstname() +" "+ e.get(i).getLastname();
			 if(b.equals(a)){
				 return e.get(i);
			 }
		 }
		return null;
	}

}
