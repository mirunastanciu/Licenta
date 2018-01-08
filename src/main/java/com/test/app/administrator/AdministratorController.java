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
	
	


}
