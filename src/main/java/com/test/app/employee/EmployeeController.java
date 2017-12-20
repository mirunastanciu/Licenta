package com.test.app.employee;

import java.util.ArrayList;
import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.test.app.account.Account;
import com.test.app.account.AccountService;
import com.test.app.address.Address;
import com.test.app.address.AddressService;
import com.test.app.contractemployee.ContractEmployee;
import com.test.app.contractemployee.ContractEmployeeService;
import com.test.app.contractemployeestatus.ContractEmployeeStatusService;
import com.test.app.specialisation.SpecialisationService;

@RestController
public class EmployeeController {

	@Autowired
	EmployeeService employeeService;

	@Autowired
	AddressService addresService;

	@Autowired
	AccountService accountService;

	@Autowired
	SpecialisationService specialosationService;

	@Autowired
	ContractEmployeeService contractEmployeeService;

	@Autowired
	ContractEmployeeStatusService contractEmployeeStatusService;

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
			empd.setSpecialisation(specialosationService.getSpecialisationById(emp.getIdspecialisation()).getName());
			empd.setSpecialisationlavel(emp.getSpecialisationlevel());
			employeeDetailsList.add(empd);

		}
		return employeeDetailsList;


	}

	@RequestMapping(path = "/saveEmployee", method = RequestMethod.POST)
	public void SaveNewEmployee(@RequestParam(value = "firstname") String firstname,
								@RequestParam(value = "lastname") String lastname,
								@RequestParam(value = "username") String username,
								@RequestParam(value = "password") String password,
								@RequestParam(value = "email") String email,
								@RequestParam(value = "specialisation") String specialisation,
								@RequestParam(value = "specialisationLavel") String specialisationLavel,
								@RequestParam(value = "country") String country,
								@RequestParam(value = "county") String county,
								@RequestParam(value = "town") String town,
								@RequestParam(value = "street") String street,
								@RequestParam(value = "streetno") int streetno,
								@RequestParam(value = "build") int build,
								@RequestParam(value = "appno") int appno,
								@RequestParam(value = "contractno") int contractno){

		Address address = new Address();
		address.setCountry(country);
		address.setConuty(county);
		address.setTown(town);
		address.setStreet(street);
		address.setStreetnumber(streetno);
		address.setBuildnumber(build);
		address.setApartmentnumber(appno);



		addresService.saveAddress(address);

		Account account = new Account();
		account.setUsername(username);
		account.setPassword(password);
		ArrayList<Address> addressesList = addresService.getAddresses();
		account.setIddress(addressesList.get(addressesList.size()-1).getIdaddress());
		account.setIdaccounttype(3);//Employee account type = 3

		accountService.saveAccount(account);

		Employee employee = new Employee();
		employee.setFirstname(firstname);
		employee.setLastname(lastname);
		ArrayList<Account> accountList = accountService.getAllAccounts();
		employee.setIdaccount(accountList.get(accountList.size()-1).getIdaccount());
		employee.setEmail(email);
		employee.setIdspecialisation(specialosationService.getSpIdByName(specialisation));
		employee.setSpecialisationlevel(specialisationLavel);
		employee.setIdcontract(contractno);

		employeeService.save(employee);
	}

	@RequestMapping(path = "/getModalDetails" , method = RequestMethod.POST)
	public EmployeeDetails getModalDetails(@RequestParam(value = "idEmployee") int idEmployee){
		Employee emp = employeeService.getEmployeeById(idEmployee);
		EmployeeDetails empd = new EmployeeDetails();

		empd.setId(emp.getId());
		String fullname = emp.getFirstname()+" "+emp.getLastname();
		empd.setName(fullname);
		empd.setSpecialisation(specialosationService.getSpecialisationById(emp.getIdspecialisation()).getName());
		empd.setSpecialisationlavel(emp.getSpecialisationlevel());
		empd.setEmail(emp.getEmail());
		empd.setUsername(accountService.getUsernameByIdAccount(emp.getIdaccount()));
		Address address = addresService.getAddressById(accountService.getIdAddressByIdAccount(emp.getIdaccount()));
		String address1 = address.getCountry()+", "+address.getConuty()+", "+address.getTown()+", "+
						  address.getStreet()+" "+address.getStreetnumber()+", Build Number : "+address.getBuildnumber()+
						  ", App No : "+address.getApartmentnumber();
		empd.setAddress(address1);
		empd.setContractid(emp.getIdcontract());
		ContractEmployee contract = contractEmployeeService.getContractById(emp.getIdcontract());
		empd.setContractstatus(contractEmployeeStatusService.getContractEmployeeStatusNameById(contract.getIdstatus()));
		empd.setSalary(contract.getSalary());
		empd.setCurency(contract.getCurency());
		empd.setStartdate(contract.getStartdate());
		empd.setExpirationdate(contract.getExpirationdate());

		return empd;
	}

	@RequestMapping(path = "/deleteEmployee" , method = RequestMethod.POST)
	public void delete(@RequestParam(value = "idEmployee") int idEmployee){
		Employee emp = employeeService.getEmployeeById(idEmployee);
		//int id = Integer.parseInt(idEmployee);
		addresService.delete(addresService.getAddressById(accountService.getIdAddressByIdAccount(employeeService.getEmployeeById(idEmployee).getIdaccount())));
		employeeService.delete(employeeService.getEmployeeById(idEmployee));
		accountService.delete(accountService.getAccountById(emp.getIdaccount()));
						   //(accountService.getAccountById(employeeService.getEmployeeById(idEmployee).getIdaccount()).getIddress())
	}



}
