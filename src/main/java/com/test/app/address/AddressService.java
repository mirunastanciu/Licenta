package com.test.app.address;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class AddressService {

	@Autowired
	AddressRepository addressRepository;

	public ArrayList<Address> getAddresses(){
		ArrayList<Address> addressList = new ArrayList<>();
		addressRepository.findAll()
		.forEach(addressList::add);

		return addressList;
	}

	public void saveAddress(Address address){
		addressRepository.save(address);
	}

	public Address getAddressById(int a){
		return addressRepository.getAddresById(a);
	}

	public void delete(Address a) {
		addressRepository.delete(a);
	}
}
