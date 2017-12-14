package com.test.app.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceService {

	@Autowired
	ServiceRepository serviceRepository;

	public com.test.app.service.Service getServiceById(int a){
		return serviceRepository.getServiceById(a);
	}

	public ArrayList<com.test.app.service.Service> getAllServices(){
		 return (ArrayList<com.test.app.service.Service>) serviceRepository.findAll();
	}

	public int getIdServiceByName(String a) {
		return serviceRepository.getServiceIdByName(a);
	}
}
