package com.restaurantorders.controllers;

import java.net.URI;
import java.util.Collection;
import java.util.Optional;

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
			Customers customers = customerRepository.findById(id).get();
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
	
	@PutMapping("/customers/{id}")
	public ResponseEntity<Customers> updateCustomer(@PathVariable Integer id, @RequestBody Customers customer) {
	    Optional<Customers> existingCustomer = customerRepository.findById(id);
	    if (existingCustomer.isPresent()) {
	        Customers c = existingCustomer.get();
	        c.setCustomerName(customer.getCustomerName());
	        c.setCustomerLastName(customer.getCustomerLastName());
	        c.setCustomerAddress(customer.getCustomerAddress());
	        c.setCustomerPhone(customer.getCustomerPhone());
	        customerRepository.save(c);
	        return ResponseEntity.ok(c);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}
	
	@DeleteMapping("customers/{customer_id}")
	public ResponseEntity<Void> deleteCustomer(@PathVariable("customer_id") Integer id) {
	    if (customerRepository.existsById(id)) {
	        customerRepository.deleteById(id);
	        return ResponseEntity.ok().build();
	    }
	    return ResponseEntity.notFound().build();
	}
}
