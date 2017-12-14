package com.test.app.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServiceController {

	@Autowired
	ServiceService serviceService;

	@RequestMapping(value = "/getAllServices" , method=RequestMethod.GET)
	public ArrayList<com.test.app.service.Service> getAllServices(){
		return serviceService.getAllServices();
	}

}
