package com.test.app.account;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test.app.administrator.Administrator;
import com.test.app.administrator.AdministratorService;
import com.test.app.client.Client;
import com.test.app.client.ClientService;
import com.test.app.employee.Employee;
import com.test.app.employee.EmployeeService;
import com.test.app.mail.Mail;
import com.test.app.mail.MailService;

@RestController
public class AccountController {

	public static String user = "temp";
	public static String pass = "temp";

	@Autowired
	private AccountService accountService;

	@Autowired
	private MailService emailService;

	@Autowired
	private ClientService clientService;

	@Autowired
	private AdministratorService adminService;

	@Autowired
	private EmployeeService employeeService;

	@RequestMapping("/accounts")
	public List<Account> getAllAccounts() {

		return accountService.getAllAccounts();
	}

	/*// User validation
	@ResponseBody
	@RequestMapping(value = "/accountvalidation", method = RequestMethod.POST)
	public int accountValidation(
			@RequestParam(value = "username") String username,
			@RequestParam(value = "password") String password) {

		int response = 0;
		ArrayList<Account> l = accountService.getAllAccounts();
		for (int i = 0; i < l.size(); i++) {

			if (username.equals(l.get(i).getUsername())
					&& password.equals(l.get(i).getPassword())) {
				response = 1;
				
				break;
			} else {
				response = -1;

			}
		}
		System.out.println(response);
		return response;

	}*/

	@RequestMapping(value = "/uniqueUser", method = RequestMethod.POST)
	public String uniquerUserCheck(
			@RequestParam(value = "username") String username) {
		ArrayList<Account> accountList = accountService.getAllAccounts();
		// 0-faild ; 1-success;
		int response = 1;
		for (int i = 0; i < accountList.size(); i++) {
			if ((accountList.get(i).getUsername()).equals(username)) {
				response = 0;
			}
		}

		if (response == 1) {
			return "success";
		} else {
			return "faild";
		}
	}

	@RequestMapping(path = "/forgotPassword", method = RequestMethod.POST)
	public String ChangePassword(
			@RequestParam(value = "username") String username,
			@RequestParam(value = "idaccount") int idaccount,
			@RequestParam(value = "newpass") String password,
			@RequestParam(value = "passretype") String passwordretype,
			@RequestParam(value = "email") String email) {

		String response = null;
		if (accountService.existAccountById(idaccount)) {
			Account ac = accountService.getAccountById(idaccount);
			if (ac.getUsername().equals(username)
					&& password.equals(passwordretype)) {
				// Account ac = accountService.getAccountById(idaccount);
				ac.setPassword(password);
				accountService.saveAccount(ac);

				Mail mail = new Mail();
				mail.setFrom("miruna.anna@gmail.com");
				mail.setTo(email);
				mail.setSubject("New Password");
				mail.setContent("The new Password is : " + password);

				emailService.sendSimpleMessage(mail);

				response = "The new password has been saved.";
			} else if (accountService.existAccountByUsername(username) == false) {
				response = "2";// "The username doesn't exist ! ";
			} else if (password.equals(passwordretype) == false) {
				response = "3";// parole nu corespund";
			}
		} else {
			response = "1";// The Id account doesn't exist ! ";
		}
		return response;

	}

	@RequestMapping(value = "/accountType", method = RequestMethod.GET)
	public int accountType() {
		Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();
		String username = authentication.getName();
		return accountService.getAccountTypeByUsername(username);
	}

	@RequestMapping(value = "/accountName", method = RequestMethod.GET)
	public String accountName() {
		Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();
		String username = authentication.getName();
		
		String response ="";

		if (accountService.getAccByUsrename(username).getIdaccounttype() == 1) {
			response = adminService.getAdminNameByUsername(username);

		} else if (accountService.getAccByUsrename(username).getIdaccounttype() == 2) {
			response = clientService.getNameByUsername(username);

		} else if (accountService.getAccByUsrename(username).getIdaccounttype() == 3) {
			response = employeeService.getNameByUsername(username);
		}
		
		return response;

	}

	@RequestMapping(value = "/checkOldPass", method = RequestMethod.POST)
	public int checkOldPass(@RequestParam(value = "oldpass") String oldpass) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		/*Object credentials = authentication.getCredentials();
		String password = (credentials.toString());
		System.out.println(password);*/
		
		int response = 0;

		String password = accountService.getAccByUsrename(username).getPassword();
		if (password.equals(oldpass)) {
			response = 1;
		}

		return response;
	}

	
	@RequestMapping(value = "/updatePass", method = RequestMethod.POST)
	public void updatePass(@RequestParam(value = "newpass") String newpass) throws Exception {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();		
		String username = authentication.getName();
		
		
		Account ac = accountService.getAccByUsrename(username);
		ac.setPassword(newpass);
		accountService.saveAccount(ac);
		
		
	}
	
	@RequestMapping(path = "/updateMyAcc", method = RequestMethod.POST)
	public void updateClMyAcc(@RequestParam(value = "fname") String fname,
							  @RequestParam(value = "lname") String lname,
							  @RequestParam(value = "email") String email) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		
		if(accountService.getAccByUsrename(username).getIdaccounttype() == 1){
			Administrator admin = adminService.getAdminByUsername(username);
			//Employee e = adminService.getEmployeeById(id)	;	
			
			admin.setFirstname(fname);
			admin.setLastname(lname);
			admin.setEmail(email);
			
			adminService.save(admin);
		}else if(accountService.getAccByUsrename(username).getIdaccounttype() == 2){
			int id = clientService.getIdClByUsername(user);
			Client c = clientService.getClientById(id);		
			
			c.setFirstname(fname);
			c.setLastname(lname);
			c.setEmail(email);
			
			clientService.saveClient(c);
		}else if(accountService.getAccByUsrename(username).getIdaccounttype() == 3){
			int id = employeeService.getIdEmpByUsername(user);
			Employee e = employeeService.getEmployeeById(id)	;	
			
			e.setFirstname(fname);
			e.setLastname(lname);
			e.setEmail(email);
			
			employeeService.save(e);
		}
		
		
		
	}

}
