package com.test.app.administrator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdministratorController {
	
	@Autowired
	AdministratorService adminService;
	
	/*@RequestMapping(path = "/getAdminName" , method=RequestMethod.POST)
	public String getCAdminName(@RequestParam(value="logeduser") String user){
		return adminService.getAdminNameByUsername(user);
	}*/
	
	@RequestMapping(path = "/getAdminDetails" , method=RequestMethod.GET)
	public Administrator getAdminDetails(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		Administrator admin = adminService.getAdminByUsername(username);
		return admin;
	}
	
	/*@RequestMapping(path = "/updateAdminMyAcc", method = RequestMethod.POST)
	public void updateEmpMyAcc(@RequestParam(value = "fname") String fname,
							  @RequestParam(value = "lname") String lname,
							  @RequestParam(value = "email") String email,
							  @RequestParam(value = "logeduser") String user) {	
		
		Administrator admin = adminService.getAdminByUsername(user);
		//Employee e = adminService.getEmployeeById(id)	;	
		
		admin.setFirstname(fname);
		admin.setLastname(lname);
		admin.setEmail(email);
		
		adminService.save(admin);
		
	}
*/


}
