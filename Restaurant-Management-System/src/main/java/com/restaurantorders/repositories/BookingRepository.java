package com.restaurantorders.repositories;

import java.time.LocalDateTime;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restaurantorders.models.Booking;
import com.restaurantorders.models.Customers;
import com.restaurantorders.models.Tables;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer>{

	
	List<Booking> findByCustomer(int customerId);
	List<Booking> findBybDate(LocalDateTime bDate);
	List<Booking> findByTable(int tableId);
	
}
