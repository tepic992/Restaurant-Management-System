package com.restaurantorders.repositories;

import java.util.Collection;


import java.util.List;

import javax.persistence.criteria.Order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restaurantorders.models.Customers;
import com.restaurantorders.models.Items;
import com.restaurantorders.models.Orders;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Integer> {

	
	 List<Orders> findByCustomer(int customer);
	 List<Orders> findByEmployee(int employee);
	 Collection<Orders> findByOrderTypeContainingIgnoreCase(String orderType);
}
