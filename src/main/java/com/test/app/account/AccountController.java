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

	// get my html form usig controlet Mapping
	@RequestMapping(value = "/log", method = RequestMethod.GET)
	public ModelAndView getLogin() {
		ModelAndView model = new ModelAndView("Login.html");
		return model;
	}

	// NOT USED
	@RequestMapping(value = "/adminpost", method = RequestMethod.POST)
	public ModelAndView showAdmin(@RequestParam("username") String username,
			@RequestParam("password") String password) {
		if (password.equals("ana")) {
			System.out.println("good");
		}
		ModelAndView model = new ModelAndView("index.html");
		model.addObject("msg", password);
		return model;
	}

	@RequestMapping(value = "/addAccount")
	public Account addAccount(@RequestParam("username") String username,
			@RequestParam("password") String password) {
		Account ac = new Account();
		ac.setUsername(username);
		ac.setPassword(password);
		ac.setIdaccounttype(1);
		ac.setIddress(0);

		return accountService.addAccount(ac);
	}

	//User validation
	@ResponseBody
	@RequestMapping(value = "/accountvalidation", method = RequestMethod.POST)
	public ModelAndView getAdminStartPage(
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
				model = new ModelAndView("Register.html");
				// return "redirect:Register.html";
			}
		}
		return model;

	}

}
