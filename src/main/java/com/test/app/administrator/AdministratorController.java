package com.test.app.administrator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdministratorController {
	
	@Autowired
	AdministratorService adminService;
	
	@RequestMapping(path = "/getAdminName" , method=RequestMethod.POST)
	public String getCAdminName(@RequestParam(value="logeduser") String user){
		return adminService.getAdminNameByUsername(user);
	}
	
	@RequestMapping(path = "/getAdminDetails" , method=RequestMethod.POST)
	public Administrator getAdminDetails(@RequestParam(value="logeduser") String user){
		Administrator admin = adminService.getAdminByUsername(user);
		return admin;
	}
	
	@RequestMapping(path = "/updateAdminMyAcc", method = RequestMethod.POST)
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



}
