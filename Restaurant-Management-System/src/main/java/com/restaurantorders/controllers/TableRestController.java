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
import com.restaurantorders.models.Tables;
import com.restaurantorders.repositories.TableRepository;

import io.swagger.annotations.ApiOperation;



@RestController
@CrossOrigin
public class TableRestController {
	

	    @Autowired
	    private TableRepository tableRepository;
	    
	    @Autowired
		private JdbcTemplate jdbcTemplate;
	    
	    @ApiOperation(value = "Returns collection of all Tables from database")
		@GetMapping("tables")
		public Collection<Tables> getTables(){
			return tableRepository.findAll();
		}
		
		@ApiOperation(value = "Returns Table with id that was forwarded as path variable")
		@GetMapping("tables/{table_id}")
		public ResponseEntity<Tables> getTable(@PathVariable("table_id") Integer id){
			if (tableRepository.findById(id).isPresent()) {
				Tables tbl = tableRepository.getOne(id);
				return new ResponseEntity<>(tbl, HttpStatus.OK);
			}

			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

		}
		

		@PostMapping("tables")
		public ResponseEntity<Tables> addOne(@RequestBody Tables tbl){
			Tables savedTables = tableRepository.save(tbl);
			URI location = URI.create("/tables/" + savedTables.getTableId());
			return ResponseEntity.created(location).body(savedTables);
		}
		
		@PutMapping("tables/{table_id}")
		public ResponseEntity<Tables> update(@PathVariable("table_id") Integer id,
				@RequestBody Tables tbl){
			if(tableRepository.existsById(id)) {
				tbl.setTableId(id);
				Tables savedTable = tableRepository.save(tbl);
				return ResponseEntity.ok().body(savedTable);
			}
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		@DeleteMapping("tables/{table_id}")
		public ResponseEntity<HttpStatus> delete(@PathVariable Integer id){

			if(id == -100 && !tableRepository.existsById(-100)) {

				jdbcTemplate.execute("INSERT INTO tables "
						+ "(\"table_id\", \"capacity\", \"employee_id\","
						+ "VALUES ('-100', 'Full', 'Null', "
						+ " )");
			}

			if (tableRepository.existsById(id)) {
				tableRepository.deleteById(id);
				return new ResponseEntity<HttpStatus>(HttpStatus.OK);
			}

			return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);



		}

	    

}
