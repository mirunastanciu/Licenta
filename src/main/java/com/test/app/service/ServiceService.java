package com.test.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceService {
	
	@Autowired 
	ServiceRepository serviceRepository;
	
	public com.test.app.service.Service getServiceById(int a){
		return serviceRepository.getServiceById(a);
	}
}
