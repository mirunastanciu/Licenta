package com.test.app.employee;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {
	
	@Autowired
	EmployeeService employeeService;
	
	@RequestMapping(path="/getAllEmployees", method=RequestMethod.GET )
	public List<Employee> getAllEmployies(){
		return employeeService.getAllEmployies();
	}
	
	@RequestMapping(path="/getAllEmployiesName" , method=RequestMethod.GET)
	public List<String> getAllEmployiesName(){
		
		List<Employee> l = employeeService.getAllEmployies();
		List<String> result = new ArrayList<>();
		for(int i=0;i<l.size();i++){
			
			String a = l.get(i).getFirstname()+" "+l.get(i).getLastname();
			result.add(a);
		}
		return result;
	}


}
