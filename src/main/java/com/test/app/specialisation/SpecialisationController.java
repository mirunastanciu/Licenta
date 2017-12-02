package com.test.app.specialisation;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SpecialisationController {
	@Autowired
	SpecialisationService specialisationService;
	
	@ResponseBody
	@RequestMapping(value="/getSpecialisationById" , method=RequestMethod.POST)
	public Specialisation getSpecialisationById(@RequestParam(name="idspecialisation") int a){
		
		return specialisationService.getSpecialisationById(a);
	}
	
	@RequestMapping(path="/getSpNames",method=RequestMethod.GET)
	public ArrayList<String> getSpNames(){
		return specialisationService.getSpecialisationNames();
	}
}
