package com.restaurantorders.repositories;

import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restaurantorders.models.Foods;
import com.restaurantorders.models.Items;

@Repository
public interface FoodRepository extends JpaRepository<Foods, Integer> {

	Collection<Foods> findByFoodNameContainingIgnoreCase(String foodName);
	
	
}
