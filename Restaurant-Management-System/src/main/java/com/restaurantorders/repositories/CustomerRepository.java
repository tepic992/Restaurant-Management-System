package com.restaurantorders.repositories;

import java.util.Collection;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restaurantorders.models.Customers;

@Repository
public interface CustomerRepository extends JpaRepository<Customers, Integer>{

	
	Collection<Customers> findByCustomerLastNameContainingIgnoreCase(String customerLastName);
	
}
