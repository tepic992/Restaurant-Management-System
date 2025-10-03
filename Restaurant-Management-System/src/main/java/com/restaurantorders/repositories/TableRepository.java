package com.restaurantorders.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restaurantorders.models.Tables;


@Repository
public interface TableRepository extends JpaRepository<Tables, Integer>{
	
	List<Tables> findByCapacity(int capacity);

}
