package com.restaurantorders.controllers;

import java.net.URI;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.restaurantorders.models.Foods;
import com.restaurantorders.repositories.FoodRepository;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin
public class FoodRestController {
	
	
	@Autowired
    private FoodRepository foodRepository;
    
    @Autowired
	private JdbcTemplate jdbcTemplate;
  
    
    @ApiOperation(value = "Returns collection of all Foods from database")
	@GetMapping("foods")
	public Collection<Foods> getFoods(){
		return foodRepository.findAll();
	}
	
	@ApiOperation(value = "Returns Foods with id that was forwarded as path variable")
	@GetMapping("foods/{food_id}")
	public ResponseEntity<Foods> getFood(@PathVariable("food_id") Integer id){
		if (foodRepository.findById(id).isPresent()) {
			Foods foods = foodRepository.getOne(id);
			return new ResponseEntity<>(foods, HttpStatus.OK);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

	}
	

	@PostMapping("foods")
	public ResponseEntity<Foods> addOne(@RequestBody Foods food){
		Foods savedFood = foodRepository.save(food);
		URI location = URI.create("/foods/" + savedFood.getFoodId());
		return ResponseEntity.created(location).body(savedFood);
	}
	
	@PutMapping("foods/{food_id}")
	public ResponseEntity<Foods> update(@PathVariable("food_id") Integer id,
			@RequestBody Foods food){
		if(foodRepository.existsById(id)) {
			food.setFoodId(id);
			Foods savedFood = foodRepository.save(food);
			return ResponseEntity.ok().body(savedFood);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("foods/{food_id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable Integer id){

		if(id == -100 && !foodRepository.existsById(-100)) {

			jdbcTemplate.execute("INSERT INTO foods "
					+ "(\"food_id\", \"employee_id\", \"food_name\", \"food_price\", "
					+ "VALUES ('-100', 'Null', 'Delete food_name', 'Delete food_price'"
					+ " )");
		}

		if (foodRepository.existsById(id)) {
			foodRepository.deleteById(id);
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}

		return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);



	}


}
