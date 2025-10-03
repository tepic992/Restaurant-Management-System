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

import com.restaurantorders.models.Employees;
import com.restaurantorders.repositories.EmployeeRepository;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin
public class EmployeeRestController {
	
	
	
	@Autowired
	private EmployeeRepository emplRepository;

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@ApiOperation(value = "Returns collection of all Employees from database")
	@GetMapping("employees")
	public Collection<Employees> getEmployees(){
		return emplRepository.findAll();
	}
	
	@ApiOperation(value = "Returns Employee with id that was forwarded as path variable")
	@GetMapping("employees/{employee_id}")
	public ResponseEntity<Employees> getEmployee(@PathVariable("employee_id") Integer id){
		if (emplRepository.findById(id).isPresent()) {
			Employees empl = emplRepository.getOne(id);
			return new ResponseEntity<>(empl, HttpStatus.OK);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

	}
	

	@PostMapping("employees")
	public ResponseEntity<Employees> addOne(@RequestBody Employees empl){
		Employees savedEmployees = emplRepository.save(empl);
		URI location = URI.create("/employees/" + savedEmployees.getEmployeeId());
		return ResponseEntity.created(location).body(savedEmployees);
	}
	
	@PutMapping("employees/{employee_id}")
	public ResponseEntity<Employees> update(@PathVariable("employee_id") Integer id,
			@RequestBody Employees empl){
		if(emplRepository.existsById(id)) {
			empl.setEmployeeId(id);
			Employees savedEmpl = emplRepository.save(empl);
			return ResponseEntity.ok().body(savedEmpl);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("employees/{employee_id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable Integer id){

		if(id == -100 && !emplRepository.existsById(-100)) {

			jdbcTemplate.execute("INSERT INTO employees "
					+ "(\"employee_id\", \"employee_address\", \"employee_last_name\", \"employee_name\","
					+ " \"employee_phone\", \"employee_salary\") "
					+ "VALUES ('-100', 'Not exists 3', 'Null', "
					+ " 'Null', '7647445', '0000')");
		}

		if (emplRepository.existsById(id)) {
			emplRepository.deleteById(id);
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}

		return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);



	}

}
