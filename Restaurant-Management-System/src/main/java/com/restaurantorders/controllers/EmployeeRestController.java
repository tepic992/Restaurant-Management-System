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
			Employees empl = emplRepository.findById(id).get();
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
	
	
	@PutMapping("/employees/{employee_id}")
	public ResponseEntity<Employees> updateEmployee(@PathVariable("employee_id") Integer id,
	                                                @RequestBody Employees newData) {
	    Optional<Employees> optionalEmployee = emplRepository.findById(id);

	    if (optionalEmployee.isPresent()) {
	        Employees existingEmployee = optionalEmployee.get();

	        // Update fields manually
	        existingEmployee.setEmployeeName(newData.getEmployeeName());
	        existingEmployee.setEmployeeLastName(newData.getEmployeeLastName());
	        existingEmployee.setEmployeeAddress(newData.getEmployeeAddress());
	        existingEmployee.setEmployeePhone(newData.getEmployeePhone());
	        existingEmployee.setEmployeeSalary(newData.getEmployeeSalary());
	        // existingEmployee.setPosition(newData.getPosition());

	        // Save the updated entity
	        Employees savedEmployee = emplRepository.save(existingEmployee);
	        return ResponseEntity.ok(savedEmployee);
	    }

	    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
	
	@DeleteMapping("/employees/{employee_id}")
	public ResponseEntity<Void> deleteEmployee(@PathVariable("employee_id") Integer id) {
	    if (emplRepository.existsById(id)) {
	        emplRepository.deleteById(id);
	        return ResponseEntity.ok().build();
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}

}
