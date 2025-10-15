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


import com.restaurantorders.models.Jobs;
import com.restaurantorders.repositories.JobRepository;


@RestController
@CrossOrigin
public class JobRestController {
	
		@Autowired
		private JobRepository jobRepository;
		
		@Autowired
		private JdbcTemplate jdbcTemplate;
		
		
		@GetMapping("jobs")
		public Collection<Jobs> getAll(){
			return jobRepository.findAll();
		}
		
		@GetMapping("jobs/{job_id}")
		public ResponseEntity<Jobs> getOne(@PathVariable("job_id") Integer id) {

			if (jobRepository.findById(id).isPresent()) {
				Jobs job = jobRepository.findById(id).get();
				return new ResponseEntity<>(job, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}

		}
		
		@GetMapping("jobs/job_title/{job_title}")
		public Collection<Jobs> getByNaziv(@PathVariable("job_title") String jobTitle){
			return jobRepository.findByJobTitleContainingIgnoreCase(jobTitle);
		}
		
		@PostMapping("jobs")
		public ResponseEntity<Jobs> addLiga(@RequestBody Jobs jobs) {
			Jobs savedJobs = jobRepository.save(jobs);
			URI location = URI.create("/jobs/" + savedJobs.getJobId());
			return ResponseEntity.created(location).body(savedJobs);
		}
		
		@PutMapping(value = "jobs/{job_id}")
		public ResponseEntity<Jobs> updateJobs(@RequestBody Jobs jobs, @PathVariable("job_id")Integer id){
			if (jobRepository.existsById(id)) {
				jobs.setJobId(id);
				Jobs savedJobs = jobRepository.save(jobs);
				return ResponseEntity.ok().body(savedJobs);
			}
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		@DeleteMapping("jobs/{id}")
		public ResponseEntity<HttpStatus> delete(@PathVariable Integer id){
			if(id==-100 && !jobRepository.existsById(id)) {
				jdbcTemplate.execute("INSERT INTO jobs (\"job_id\",\"job_title\")"
						+ " VALUES (-100, 'Delete job')");
			}

			if (jobRepository.existsById(id)) {
				jobRepository.deleteById(id);
				return new ResponseEntity<HttpStatus>(HttpStatus.OK);
			}

			return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
		}
	
}
