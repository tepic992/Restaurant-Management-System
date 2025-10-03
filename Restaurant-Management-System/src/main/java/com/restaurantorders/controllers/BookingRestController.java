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

import com.restaurantorders.models.Booking;
import com.restaurantorders.repositories.BookingRepository;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin
public class BookingRestController {
	
	
	@Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
	private JdbcTemplate jdbcTemplate;
  
    
    @ApiOperation(value = "Returns collection of all Bookings from database")
	@GetMapping("booking")
	public Collection<Booking> getBooking(){
		return bookingRepository.findAll();
	}
	
	@ApiOperation(value = "Returns Booking with id that was forwarded as path variable")
	@GetMapping("booking/{booking_id}")
	public ResponseEntity<Booking> getFood(@PathVariable("booking_id") Integer id){
		if (bookingRepository.findById(id).isPresent()) {
			Booking books = bookingRepository.getOne(id);
			return new ResponseEntity<>(books, HttpStatus.OK);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

	}
	

	@PostMapping("booking")
	public ResponseEntity<Booking> addOne(@RequestBody Booking book){
		Booking savedBooking = bookingRepository.save(book);
		URI location = URI.create("/booking/" + savedBooking.getBookingId());
		return ResponseEntity.created(location).body(savedBooking);
	}
	
	@PutMapping("booking/{booking_id}")
	public ResponseEntity<Booking> update(@PathVariable("booking_id") Integer id,
			@RequestBody Booking bookings){
		if(bookingRepository.existsById(id)) {
			bookings.setBookingId(id);
			Booking savedBooking = bookingRepository.save(bookings);
			return ResponseEntity.ok().body(savedBooking);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("booking/{booking_id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable Integer id){

		if(id == -100 && !bookingRepository.existsById(-100)) {

			jdbcTemplate.execute("INSERT INTO booking (\"booking_id\",\"b_date\", \"b_hour\","
					+ "\"customer_id\", \"table_id\",)"
					+ " VALUES (-100, 'null', 'null', 'null', 'null')");
		}

		if (bookingRepository.existsById(id)) {
			bookingRepository.deleteById(id);
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}

		return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);



	}

}
