package com.test.app.account;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.test.app.client.ClientService;
import com.test.app.mail.Mail;
import com.test.app.mail.MailService;


@RestController
public class AccountController  {

	
	public static String user = "temp";
	public static String pass = "temp";

	@Autowired
	private AccountService accountService;

	@Autowired
    private MailService emailService;

	@Autowired
    private ClientService clientService;


	@RequestMapping("/accounts")
	public List<Account> getAllAccounts() {

		return accountService.getAllAccounts();
	}

	

	//User validation
			@ResponseBody
			@RequestMapping(value = "/accountvalidation", method = RequestMethod.POST)
			public int accountValidation(
					@RequestParam(value = "username") String username,
					@RequestParam(value = "password") String password)  {
			
				
				int response = 0;
				ArrayList<Account> l = accountService.getAllAccounts();
				for (int i = 0; i < l.size(); i++) {

					if (username.equals(l.get(i).getUsername())
							&& password.equals(l.get(i).getPassword())) {
						response = 1;
						/*if (l.get(i).validateAdmin()) {
							user = username;
							pass = password;
							response =  "/startPage";

							break;
						}else if(l.get(i).validateClient()){
							user = username;
							pass = password;
							response = "/startPage";

							break;
						}else if(l.get(i).validateEmployee()){
							user = username;
							pass = password;
							response = "/startPage";

							break;

						}*/
					} else {
						response = -1;

					}
				}
				return response;


			}
			
			
		    


	@RequestMapping(value="/uniqueUser" , method=RequestMethod.POST)
	public String uniquerUserCheck(@RequestParam(value="username") String username){
		ArrayList<Account> accountList = accountService.getAllAccounts();
		// 0-faild ; 1-success;
		int response = 1;
		for(int i=0;i<accountList.size();i++){
			if((accountList.get(i).getUsername()).equals(username)){
				response = 0;
			}
		}

		if(response == 1){
			return "success";
		}else{
			return "faild";
		}
	}

	@RequestMapping(path = "/forgotPassword", method = RequestMethod.POST)
	public String ChangePassword(@RequestParam(value = "username")String username,
								 @RequestParam(value = "idaccount")int idaccount,
								 @RequestParam(value = "newpass")String password,
								 @RequestParam(value = "passretype")String passwordretype,
								 @RequestParam(value = "email")String email){


		String response = null;
		if( accountService.existAccountById(idaccount)){
			Account ac = accountService.getAccountById(idaccount);
			if(ac.getUsername().equals(username) && password.equals(passwordretype)){
				//Account ac = accountService.getAccountById(idaccount);
				ac.setPassword(password);
				accountService.saveAccount(ac);

				 Mail mail = new Mail();
				 mail.setFrom("miruna.anna@gmail.com");
			     mail.setTo(email);
			     mail.setSubject("New Password");
			     mail.setContent("The new Password is : "+ password);

			     emailService.sendSimpleMessage(mail);

				response = "The new password was saved successfully";
			}else if(accountService.existAccountByUsername(username) == false ){
						response ="2";// "The username doesn't exist ! ";
						}else if(password.equals(passwordretype)== false){
							response = "3";//parole nu corespund";
						}
		}else{
			response = "1";//The Id account doesn't exist ! ";
		}
		return response;

		}

	@RequestMapping(value = "/accountType", method = RequestMethod.POST)
	public int accountType(@RequestParam(value = "logeduser") String username) {
		return accountService.getAccountTypeByUsername(username);
	}

	@RequestMapping(value = "/checkOldPass", method = RequestMethod.POST)
	public int checkOldPass(@RequestParam(value = "oldpass") String oldpass,
			                @RequestParam(value = "logeduser") String username) {

		int response = 0;

		String passByUsername = accountService.getAccByUsrename(username).getPassword();
		if(passByUsername.equals(oldpass)) {
			response = 1;
		}

		return response;
	}

	@RequestMapping(value = "/updatePass", method = RequestMethod.POST)
	public void updatePass(@RequestParam(value = "newpass") String newpass,
			                @RequestParam(value = "logeduser") String username) {


           Account ac = accountService.getAccByUsrename(username);
           ac.setPassword(newpass);

           accountService.saveAccount(ac);

	}





}
