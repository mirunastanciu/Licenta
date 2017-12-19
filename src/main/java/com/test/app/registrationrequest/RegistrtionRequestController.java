package com.test.app.registrationrequest;

import java.util.ArrayList;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test.app.mail.Mail;
import com.test.app.mail.MailService;

@RestController
public class RegistrtionRequestController {
	
	@Autowired
	RegistrationRequestService registrationRequestService ;
	
	@Autowired
	MailService emailService;

	
	@RequestMapping(value = "/registrationRequest" , method = RequestMethod.POST)
	public void registrationRequest(@RequestParam(value="name") String name,
							 @RequestParam(value="email") String email,
			                 @RequestParam(value="phone") String phone){
		
		RegistrationRequest rr = new RegistrationRequest();
		rr.setEmail(email);
		rr.setName(name);
		rr.setPhone(phone);
		rr.setStatus("WAITING TO BE PROCCESSED");
		registrationRequestService.save(rr);
		
	}
	
	@RequestMapping(value = "/valivationSecureCode" , method = RequestMethod.POST)
	public String registrationRequest(@RequestParam(value="idrequest") int idrequest,
							 		  @RequestParam(value="securecode") int securecode){
		
		String response = null;
	
		if( registrationRequestService.existRegistrationRequest(idrequest)){
			
			RegistrationRequest rr = registrationRequestService.getRegistrationRequestById(idrequest);
			if(rr.getSecurecode() == securecode){
			
				response = "VALID";
			}else if(rr.getSecurecode() != securecode){
							response = "2";//Secure code is incorrect";
						}
		}else{
			response = "1";//The request doesn't exist ! ";
		}
		return response;
		
	}
	

	@RequestMapping(value = "/getWTBPRequests" , method = RequestMethod.GET)
	public ArrayList<RegistrationRequest> getWTBPRequests(){
		
		return registrationRequestService.getRequestsByStatus("WAITING TO BE PROCCESSED");
	}
	
	@RequestMapping(value = "/getAPRequests" , method = RequestMethod.GET)
	public ArrayList<RegistrationRequest> getAPRequests(){
		
		return registrationRequestService.getRequestsByStatus("PROCCESSED");
	}
	
	@RequestMapping(value = "/processRequest" , method = RequestMethod.POST)
	public void processRequest(@RequestParam(value="idRequest") int idRequest){
		RegistrationRequest rr = registrationRequestService.getRegistrationRequestById(idRequest);
		
		Random rand = new Random();
		int num = rand.nextInt(9000000) + 1000000;
		rr.setSecurecode(num);
		rr.setStatus("PROCCESSED");
		
		registrationRequestService.save(rr);
		
		
		Mail mail = new Mail();
		
		mail.setFrom("miruna.anna@gmail.com");
        mail.setTo(rr.getEmail());
        mail.setSubject("Secure Code for Account Registration");
        mail.setContent("The request id is : "+rr.getId()+", and the "+"secure code for your Account Registration is : "+rr.getSecurecode()+" ."+"\n\n\n"+"Thank You !");

        emailService.sendSimpleMessage(mail);
		
	}
	
	
}

