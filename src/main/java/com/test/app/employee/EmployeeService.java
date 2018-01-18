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
		return employeeRepository.getEmployeeById(a);
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

	public int getIdEmployeeByName(String a , String b){
		return employeeRepository.getIdEmployeeByName(a, b);
	}

	public void save(Employee e){
		employeeRepository.save(e);
	}

	public void delete(Employee e) {
		employeeRepository.delete(e);
	}
	
	public String getNameByUsername(String a){
		String fname = employeeRepository.getEmpFNameByUsername(a);
		String lname = employeeRepository.getEmpLNameByUsername(a);
		String fullname =fname+" "+lname;
		System.out.println(fullname);
		 
		return fullname;
	}
	
	public int getIdEmpByUsername(String a){
		return employeeRepository.getEmpIdByUsername(a);
	}
	
	public int getSpecialisationByIdEmp(int a){
		return employeeRepository.getEmpSpecialisationById(a);
	}


}
