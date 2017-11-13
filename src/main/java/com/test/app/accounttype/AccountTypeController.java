package com.test.app.accounttype;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class AccountTypeController {

	
	@RequestMapping("/administratorStartPage")
	public ModelAndView getAdminPage() {
		ModelAndView m = new ModelAndView("AdminStartPage");
		return m;
	}
	
	@RequestMapping("/clientStartPage")
	public ModelAndView getClientStartPage() {
		ModelAndView m = new ModelAndView("ClientStartPage");
		return m;
	}

	
	@RequestMapping("/administratorPage")
	public ModelAndView getEmployeePage() {
		ModelAndView m = new ModelAndView("AdminStartPage");
		return m;
	}
}
