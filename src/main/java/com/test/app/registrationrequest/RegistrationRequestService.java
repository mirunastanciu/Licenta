package com.test.app.registrationrequest;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RegistrationRequestService {
	
	@Autowired
	RegistrationRequestRepository RegistrationRequestRepository;
	
	public ArrayList<RegistrationRequest> getAllRequest(){
		ArrayList<RegistrationRequest> RR = new ArrayList<>();
		 RegistrationRequestRepository.findAll().forEach(RR::add);
		 return RR;
	}
	
	public int getSecureCodeByIdRequst(int a){
		return RegistrationRequestRepository.getSecureCodeByIdRequest(a);
	}
	
	public void save(RegistrationRequest rr){
		 RegistrationRequestRepository.save(rr);
	}
	
	public RegistrationRequest getRegistrationRequestById(int a){
		return RegistrationRequestRepository.getRegistrationRequestById(a);
	}
	
	public boolean existRegistrationRequest(int a){
		boolean exist = false;
		
			ArrayList<RegistrationRequest> ac =  getAllRequest();
			for(int i=0;i<ac.size();i++){
				if(ac.get(i).getId() == a){
					exist = true;
				}
			}
			return exist;
	}
	
	public ArrayList<RegistrationRequest> getRequestsByStatus(String a){
		return RegistrationRequestRepository.getRegistrationRequestByStatus(a);
		
	}
		

}
