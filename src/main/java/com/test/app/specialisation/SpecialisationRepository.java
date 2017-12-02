package com.test.app.specialisation;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface SpecialisationRepository extends CrudRepository<Specialisation,String>{
	
	@Query(value="SELECT SPECIALISATIONNAME FROM specialisation;",nativeQuery=true)
	public ArrayList<String> getSpecialisationNames();
	
	@Query(value="SELECT IDSPECIALISATION FROM specialisation WHERE SPECIALISATIONNAME = ?;",nativeQuery=true)
	public int getSpecialisationIdByNames(String a);

}
