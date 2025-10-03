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

import com.restaurantorders.models.Customers;
import com.restaurantorders.repositories.CustomerRepository;


@RestController
@CrossOrigin
public class CustomerRestController {

	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	@GetMapping("customers")
	public Collection<Customers> getAll(){
		return customerRepository.findAll();
	}
	
	@GetMapping("customers/{customer_id}")
	public ResponseEntity<Customers> getOne(@PathVariable("customer_id") Integer id) {

		if (customerRepository.findById(id).isPresent()) {
			Customers customers = customerRepository.getOne(id);
			return new ResponseEntity<>(customers, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}

	}
	
	@GetMapping("customers/customer_last_name/{customer_last_name}")
	public Collection<Customers> getByNaziv(@PathVariable("customer_last_name") String customerLastName){
		return customerRepository.findByCustomerLastNameContainingIgnoreCase(customerLastName);
	}
	
	@PostMapping("customers")
	public ResponseEntity<Customers> addCustomers(@RequestBody Customers customers) {
		Customers savedCustomers = customerRepository.save(customers);
		URI location = URI.create("/job/" + savedCustomers.getCustomerId());
		return ResponseEntity.created(location).body(savedCustomers);
	}
	
	@PutMapping(value = "customers/{customer_id}")
	public ResponseEntity<Customers> updateCustomers(@RequestBody Customers customers, @PathVariable("customer_id")Integer id){
		if (customerRepository.existsById(id)) {
			customers.setCustomerId(id);
			Customers savedCustomers = customerRepository.save(customers);
			return ResponseEntity.ok().body(savedCustomers);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("customers/{customer_id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable Integer id){
		if(id==-100 && !customerRepository.existsById(id)) {
			jdbcTemplate.execute("INSERT INTO customers (\"customer_id\",\"customer_address\", \"customer_last_name\","
					+ "\"customer_name\", \"customer_phone\",)"
					+ " VALUES (-100, 'null', 'null', 'null', 'null')");
		}

		if (customerRepository.existsById(id)) {
			customerRepository.deleteById(id);
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}

		return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
	}	
	
}
