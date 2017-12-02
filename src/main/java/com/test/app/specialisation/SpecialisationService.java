package com.test.app.specialisation;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SpecialisationService {
	
	@Autowired
	SpecialisationRepository specialisationRepository;
	
	public ArrayList<Specialisation> getAllSpecialisations(){
		ArrayList<Specialisation> spList = new ArrayList<>();
		specialisationRepository.findAll().forEach(spList::add);
		return spList;
	}
	
	public Specialisation getSpecialisationById(int a){
		ArrayList<Specialisation> spList = getAllSpecialisations();
		for(int i=0;i<spList.size();i++){
			 if(spList.get(i).getIdspecialisation() == a){
				 return spList.get(i);
			 }
		 }
		return null;
	}
	
	public ArrayList<String> getSpecialisationNames(){
		ArrayList<String> spList = new ArrayList<>();
		specialisationRepository.getSpecialisationNames().forEach(spList::add);
		return spList;
	}
	
	public int getSpIdByName(String a){
		return specialisationRepository.getSpecialisationIdByNames(a);
	}

}
