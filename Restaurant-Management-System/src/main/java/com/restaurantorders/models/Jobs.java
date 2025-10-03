package com.restaurantorders.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the jobs database table.
 * 
 */
@Entity
@NamedQuery(name="Jobs.findAll", query="SELECT j FROM Jobs j")
public class Jobs implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="JOBS_JOBID_GENERATOR", sequenceName="JOB_SEQUENCE", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="JOBS_JOBID_GENERATOR")
	@Column(name="job_id")
	private Integer jobId;

	@Column(name="job_title")
	private String jobTitle;

	//bi-directional many-to-one association to Employees
	@JsonIgnore
	@OneToMany(mappedBy="job")
	private List<Employees> employees;

	public Jobs() {
	}

	public Integer getJobId() {
		return this.jobId;
	}

	public void setJobId(Integer jobId) {
		this.jobId = jobId;
	}

	public String getJobTitle() {
		return this.jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public List<Employees> getEmployees() {
		return this.employees;
	}

	public void setEmployees(List<Employees> employees) {
		this.employees = employees;
	}

	public Employees addEmployee(Employees employee) {
		getEmployees().add(employee);
		employee.setJob(this);

		return employee;
	}

	public Employees removeEmployee(Employees employee) {
		getEmployees().remove(employee);
		employee.setJob(null);

		return employee;
	}

}