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

import com.restaurantorders.models.Orders;
import com.restaurantorders.repositories.OrderRepository;


@RestController
@CrossOrigin
public class OrderRestController {
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	@GetMapping("orders")
	public Collection<Orders> getAll(){
		return orderRepository.findAll();
	}
	
	@GetMapping("orders/{order_id}")
	public ResponseEntity<Orders> getOne(@PathVariable("order_id") Integer id) {

		if (orderRepository.findById(id).isPresent()) {
			Orders order = orderRepository.findById(id).get();
			return new ResponseEntity<>(order, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}

	}
	
	@GetMapping("orders/order_type/{order_type}")
	public Collection<Orders> getByNaziv(@PathVariable("order_type") String orderType){
		return orderRepository.findByOrderTypeContainingIgnoreCase(orderType);
	}
	
	@PostMapping("orders")
	public ResponseEntity<Orders> addOrders(@RequestBody Orders orders) {
		Orders savedOrders = orderRepository.save(orders);
		URI location = URI.create("/orders/" + savedOrders.getOrderId());
		return ResponseEntity.created(location).body(savedOrders);
	}
	
	@PutMapping(value = "orders/{order_id}")
	public ResponseEntity<Orders> updateCustomers(@RequestBody Orders orders, @PathVariable("order_id")Integer id){
		if (orderRepository.existsById(id)) {
			orders.setOrderId(id);
			Orders savedOrders = orderRepository.save(orders);
			return ResponseEntity.ok().body(savedOrders);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("orders/{order_id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable Integer id){
		if(id==-100 && !orderRepository.existsById(id)) {
			jdbcTemplate.execute("INSERT INTO orders (\"order_id\",\"order_date\", \"order_type\","
					+ "\"customer_id\", \"employee_id\",)"
					+ " VALUES (-100, 'null', 'null', 'null', 'null')");
		}

		if (orderRepository.existsById(id)) {
			orderRepository.deleteById(id);
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}

		return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
	}	

}
