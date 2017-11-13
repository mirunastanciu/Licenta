package com.test.app.projecttype;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProjectTypeController {
	
	@Autowired
	ProjectTypeService projectTypetService;
	
	@RequestMapping(path="/allProjectTypes", method = RequestMethod.GET)
	@ResponseBody
	public List<ProjectType> getAllProjectTypes(){
		return projectTypetService.getAllProjectTypes();
	}
	
	@RequestMapping(path="/allProjectTypesName", method = RequestMethod.GET)
	@ResponseBody
	public List<String> getAllProjectTypesName(){
		List<ProjectType> l = projectTypetService.getAllProjectTypes();
		List<String> result = new ArrayList<>();
		for(int i=0;i<l.size();i++){
			result.add(l.get(i).getProjtypename());
		}
		return result;
		
	}
	
	

	
	
	  

}
