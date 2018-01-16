package com.test.app.getPage;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class GetPagesController {

	@RequestMapping("/registerAccount")
	public ModelAndView getRegisterProject() {
		ModelAndView m = new ModelAndView("Register");
		return m;
	}

	/*@RequestMapping("/adminiAccountPage")
	public ModelAndView getAdminAccountPage() {
		ModelAndView m = new ModelAndView("AdminAccountPage");
		return m;
	}*/
	
	@RequestMapping(value="/login", method=RequestMethod.GET)
	public ModelAndView logintest() {
		ModelAndView m = new ModelAndView("startPage");
		return m;
	}


	@RequestMapping("/loginPage" )
	public ModelAndView getLoginPage() {
		ModelAndView m = new ModelAndView("Login");
		return m;
	}

	@RequestMapping("/newTicketPage")
	public ModelAndView getAdminPage() {
		ModelAndView m = new ModelAndView("RegisterProject");
		return m;
	}

	@RequestMapping("/forgotPasswordPage")
	public ModelAndView getForgotPasswordPage() {
		ModelAndView m = new ModelAndView("ForgotPasswordPage");
		return m;
	}


	@RequestMapping("/accountsPage")
	public ModelAndView getEmployeesPage() {
		ModelAndView m = new ModelAndView("Accounts");
		return m;
	}

	@RequestMapping("/contractsPage")
	public ModelAndView getContractsPage() {
		ModelAndView m = new ModelAndView("Contracts");
		return m;
	}

	@RequestMapping("/invoicePage")
	public ModelAndView getInvoicesPage() {
		ModelAndView m = new ModelAndView("Invoice");
		return m;
		/*String name = principal.getName();
	    model.addAttribute("username", name);
	    return "Invoice";*/
	}

	@RequestMapping("/CreateNewInvoicePage")
	public ModelAndView getNewInvoicesPage() {
		ModelAndView m = new ModelAndView("CreateNewInvoice");
		return m;
	}

	@RequestMapping("/indexPage")
	public ModelAndView getindexPage() {
		ModelAndView m = new ModelAndView("redirect:index.html");
		return m;
	}


	@RequestMapping("/registationRequestPage")
	public ModelAndView getRegistrationRequestPage() {
		ModelAndView m = new ModelAndView("RegistrationRequest");
		return m;
	}

	@RequestMapping("/registationRequestPageList")
	public ModelAndView getRegistrationRequestPageList() {
		ModelAndView m = new ModelAndView("RegistrationRequestsPage");
		return m;
	}

	@RequestMapping("/myAccountPage")
	public ModelAndView getMyAccountPage() {
		ModelAndView m = new ModelAndView("MyAccountPage");
		return m;
	}

	@RequestMapping("/unauthorized")
	public ModelAndView getUnauthorized() {
		ModelAndView m = new ModelAndView("Unauthorized");
		return m;
	}
	
	@RequestMapping(value="/logout", method = RequestMethod.GET)
	public String logoutPage (HttpServletRequest request, HttpServletResponse response) {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    if (auth != null){    
	        new SecurityContextLogoutHandler().logout(request, response, auth);
	    }
	    return "redirect:/loginPage";//You can redirect wherever you want, but generally it's a good practice to show login screen again.
	}
}
