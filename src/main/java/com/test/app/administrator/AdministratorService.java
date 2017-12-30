package com.test.app.administrator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdministratorService {
	
	@Autowired 
	AdministratorRepository administratorRepository;

	public String getAdminemail(){
		return administratorRepository.getAdminMail();
	}
	
	public String getAdminNameByUsername(String a){
		String fname = administratorRepository.getAdminFNameByUsername(a);
		String lname = administratorRepository.getAdminLNameByUsername(a);
		String fullname =fname+" "+lname;
		 
		return fullname;
	}
}
