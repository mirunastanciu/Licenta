package com.test.app.account;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {

	@Autowired
	private AccountService accountService;


	@RequestMapping("/accounts")
	public List<Account> getAllAccounts() {

		return accountService.getAllAccounts();
	}


	//User validation
	@ResponseBody
	@RequestMapping(value = "/accountvalidation", method = RequestMethod.POST)
	public String accountValidation(
			@RequestParam(value = "username") String username,
			@RequestParam(value = "password") String password) {
		String response = null;
		ArrayList<Account> l = accountService.getAllAccounts();
		for (int i = 0; i < l.size(); i++) {

			if (username.equals(l.get(i).getUsername())
					&& password.equals(l.get(i).getPassword())) {
				if (l.get(i).validateAdmin()) {
					response =  "http://localhost:8082/administratorStartPage";
					//model = new ModelAndView("redirect:/administratorStartPage");
					// return "redirect:AdminStartPage.html";
					break;
				}else if(l.get(i).validateClient()){
					response = "http://localhost:8082/clientStartPage";
					//model = new ModelAndView("redirect:/clientStartPage");
					break;
				}else if(l.get(i).validateEmployee()){
					response = "http://localhost:8082/administratorPage";
					//model = new ModelAndView("redirect:/administratorPage");
					break;

				}
			} else {
				response = "http://localhost:8082/registerAccount";
				//model = new ModelAndView("redirect:/registerAccount");
				// return "redirect:Register.html";
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

}
