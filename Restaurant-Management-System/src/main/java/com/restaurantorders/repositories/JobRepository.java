package com.restaurantorders.repositories;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restaurantorders.models.Jobs;


@Repository
public interface JobRepository extends JpaRepository<Jobs, Integer>{

	Collection<Jobs> findByJobTitleContainingIgnoreCase(String jobTitle);
}
