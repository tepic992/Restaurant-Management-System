package com.restaurantorders.repositories;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restaurantorders.models.Employees;


@Repository
public interface EmployeeRepository extends JpaRepository<Employees, Integer>{
	
	Collection<Employees> findByJobLessThanOrderByEmployeeId(Integer id);
	

}
