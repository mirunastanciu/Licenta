package com.test.app.projecttype;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTypeService {

	@Autowired
	ProjectTypeRepository projectTypeRepository;

	public ArrayList<ProjectType> getAllProjectTypes() {
		ArrayList<ProjectType> projectTypesList = new ArrayList<>();
		projectTypeRepository.findAll().forEach(projectTypesList::add);

		return projectTypesList;
	}
	
	public ProjectType getProjectTypeById(int a){
		ArrayList<ProjectType> p = getAllProjectTypes();
		 for(int i=0;i<p.size();i++){
			 if(p.get(i).getId() == a){
				 return p.get(i);
			 }
		 }
		return null;
	}

}
