package com.test.app.accounttype;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller

public class AccountTypeController {

	
	@RequestMapping("/startPage")
	public ModelAndView getAdminPage() {
		ModelAndView m = new ModelAndView("StartPage");
		return m;
	}
	
	/*@RequestMapping("/clientStartPage")
	public ModelAndView getClientStartPage() {
		ModelAndView m = new ModelAndView("ClientStartPage");
		return m;
	}
	
	@RequestMapping("/employeeSratPage")
	public ModelAndView getEmployeePage() {
		ModelAndView m = new ModelAndView("AdminStartPage");
		return m;
	}*/
	
	
	
	
	
}
