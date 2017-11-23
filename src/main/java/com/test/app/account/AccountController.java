package com.test.app.account;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class AccountController {

	@Autowired
	private AccountService accountService;
	private ModelAndView model;

	@RequestMapping("/accounts")
	public List<Account> getAllAccounts() {

		return accountService.getAllAccounts();
	}


	//User validation
	@ResponseBody
	@RequestMapping(value = "/accountvalidation", method = RequestMethod.POST)
	public ModelAndView accountValidation(
			@RequestParam(value = "username") String username,
			@RequestParam(value = "password") String password) {
		
		ArrayList<Account> l = accountService.getAllAccounts();
		for (int i = 0; i < l.size(); i++) {

			if (username.equals(l.get(i).getUsername())
					&& password.equals(l.get(i).getPassword())) {
				if (l.get(i).validateAdmin()) {

					model = new ModelAndView("redirect:/administratorStartPage");
					// return "redirect:AdminStartPage.html";
					break;
				}else if(l.get(i).validateClient()){
					model = new ModelAndView("redirect:/clientStartPage");
					break;
				}else if(l.get(i).validateEmployee()){
					model = new ModelAndView("redirect:/administratorPage");
					break;
				}
			} else {
				System.out
						.println("This account doesn't exist ! Please register");
				model = new ModelAndView("redirect:/registerAccount");
				// return "redirect:Register.html";
			}
		}
		return model;

	}

}
