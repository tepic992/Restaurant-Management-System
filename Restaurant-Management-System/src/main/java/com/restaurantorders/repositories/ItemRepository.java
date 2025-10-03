package com.restaurantorders.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restaurantorders.models.Items;


@Repository
public interface ItemRepository extends JpaRepository<Items, Integer>{
	
	List<Items> findByFood(int foodId);
    List<Items> findByOrder(int order);

}
