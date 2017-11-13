package com.test.app.administrator;

import org.springframework.data.repository.CrudRepository;

public interface AdministratorRepository extends
		CrudRepository<Administrator, String> {

}
