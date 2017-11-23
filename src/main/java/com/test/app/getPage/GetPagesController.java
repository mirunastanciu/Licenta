package com.test.app.getPage;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class GetPagesController {
	
	@RequestMapping("/registerAccount")
	public ModelAndView getRegisterProject() {
		ModelAndView m = new ModelAndView("Register");
		return m;
	}
	
	@RequestMapping("/adminiAccountPage")
	public ModelAndView getAdminAccountPage() {
		ModelAndView m = new ModelAndView("AdminAccountPage");
		return m;
	}
	
	@RequestMapping("/loginPage")
	public ModelAndView getLoginPage() {
		ModelAndView m = new ModelAndView("Login");
		return m;
	}
	
	@RequestMapping("/newTicketPage")
	public ModelAndView getAdminPage() {
		ModelAndView m = new ModelAndView("RegisterProject");
		return m;
	}

}
