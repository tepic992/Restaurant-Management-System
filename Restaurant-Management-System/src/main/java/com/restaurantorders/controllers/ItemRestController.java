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

import com.restaurantorders.models.Items;
import com.restaurantorders.repositories.ItemRepository;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin
public class ItemRestController {
	
	@Autowired
    private ItemRepository itemRepository;
    
    @Autowired
	private JdbcTemplate jdbcTemplate;
  
    
    @ApiOperation(value = "Returns collection of all Items from database")
	@GetMapping("items")
	public Collection<Items> getItems(){
		return itemRepository.findAll();
	}
	
	@ApiOperation(value = "Returns Item with id that was forwarded as path variable")
	@GetMapping("items/{item_id}")
	public ResponseEntity<Items> getItem(@PathVariable("item_id") Integer id){
		if (itemRepository.findById(id).isPresent()) {
			Items items = itemRepository.getOne(id);
			return new ResponseEntity<>(items, HttpStatus.OK);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

	}
	

	@PostMapping("items")
	public ResponseEntity<Items> addOne(@RequestBody Items items){
		Items savedItems = itemRepository.save(items);
		URI location = URI.create("/items/" + savedItems.getItemId());
		return ResponseEntity.created(location).body(savedItems);
	}
	
	@PutMapping("items/{item_id}")
	public ResponseEntity<Items> update(@PathVariable("item_id") Integer id,
			@RequestBody Items items){
		if(itemRepository.existsById(id)) {
			items.setItemId(id);
			Items savedItem = itemRepository.save(items);
			return ResponseEntity.ok().body(savedItem);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("items/{item_id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable Integer id){

		if(id == -100 && !itemRepository.existsById(-100)) {

			jdbcTemplate.execute("INSERT INTO items "
					+ "(\"item_id\", \"quantity\", \"food_id\", \"order_id\", "
					+ "VALUES ('-100', 'Null', 'Delete food_id', 'Delete order_id'"
					+ " )");
		}

		if (itemRepository.existsById(id)) {
			itemRepository.deleteById(id);
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}

		return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);



	}

}
