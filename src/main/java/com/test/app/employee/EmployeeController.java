package com.test.app.employee;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.test.app.specialisation.SpecialisationService;
import com.test.app.ticket.Ticket;
import com.test.app.ticket.TicketDetails;

@RestController
public class EmployeeController {
	
	@Autowired
	EmployeeService employeeService;
	
	@Autowired
	SpecialisationService specialosationService;
	
	@RequestMapping(path="/getAllEmployees", method=RequestMethod.GET )
	public ArrayList<Employee> getAllEmployies(){
		return employeeService.getAllEmployies();
	}
	
	@RequestMapping(path="/getAllEmployiesName" , method=RequestMethod.GET)
	public ArrayList<String> getAllEmployiesName(){
		
		ArrayList<Employee> l = employeeService.getAllEmployies();
		ArrayList<String> result = new ArrayList<>();
		for(int i=0;i<l.size();i++){
			
			String a = l.get(i).getFirstname()+" "+l.get(i).getLastname();
			result.add(a);
		}
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value ="/getEmployeeByName" , method=RequestMethod.POST)
	public Employee getEmployeeByName(@RequestParam(value = "name") String name){
		return employeeService.getEmployeeByName(name);
	}

	@RequestMapping(path = "/employeesDetails", method = RequestMethod.GET)
	public ArrayList<EmployeeDetails> getEmployeeDetails(){
		ArrayList<Employee> employeeList = getAllEmployies();
		ArrayList<EmployeeDetails> employeeDetailsList = new ArrayList<>();
		
		Iterator<Employee> it = employeeList.iterator();
		while (it.hasNext()) {
			Employee emp = it.next();
			EmployeeDetails empd = new EmployeeDetails();
			
			empd.setId(emp.getId());
			
			String fullname = emp.getFirstname()+" "+emp.getLastname();
			empd.setName(fullname);
			empd.setSpecialisation(specialosationService.getSpecialisationById(emp.getIdspecialisation()).getName());;
				
			employeeDetailsList.add(empd);
			
		}
		return employeeDetailsList;
		
		
	}

}
