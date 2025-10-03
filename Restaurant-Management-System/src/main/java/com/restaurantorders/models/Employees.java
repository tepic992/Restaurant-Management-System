package com.restaurantorders.models;

import java.io.Serializable;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the employees database table.
 * 
 */
@Entity
@NamedQuery(name="Employees.findAll", query="SELECT e FROM Employees e")
public class Employees implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="EMPLOYEES_EMPLOYEEID_GENERATOR", sequenceName="EMPLOYEE_SEQUENCE", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="EMPLOYEES_EMPLOYEEID_GENERATOR")
	@Column(name="employee_id")
	private Integer employeeId;

	@Column(name="employee_address")
	private String employeeAddress;

	@Column(name="employee_last_name")
	private String employeeLastName;

	@Column(name="employee_name")
	private String employeeName;

	@Column(name="employee_phone")
	private Integer employeePhone;

	@Column(name="employee_salary")
	private Integer employeeSalary;

	//bi-directional many-to-one association to Jobs
	
	@ManyToOne
	@JoinColumn(name="job_id")
	private Jobs job;
	
	@JsonIgnore
	@OneToMany(mappedBy="employee")
	private List<Foods> foods;
	
	@JsonIgnore
	@OneToMany(mappedBy="employee")
	private List<Tables> tables;
	//bi-directional many-to-one association to Orders
	@JsonIgnore
	@OneToMany(mappedBy="employee")
	private List<Orders> orders;

	public Employees() {
	}

	public Integer getEmployeeId() {
		return this.employeeId;
	}

	public void setEmployeeId(Integer employeeId) {
		this.employeeId = employeeId;
	}

	public String getEmployeeAddress() {
		return this.employeeAddress;
	}

	public void setEmployeeAddress(String employeeAddress) {
		this.employeeAddress = employeeAddress;
	}

	public String getEmployeeLastName() {
		return this.employeeLastName;
	}

	public void setEmployeeLastName(String employeeLastName) {
		this.employeeLastName = employeeLastName;
	}

	public String getEmployeeName() {
		return this.employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public Integer getEmployeePhone() {
		return this.employeePhone;
	}

	public void setEmployeePhone(Integer employeePhone) {
		this.employeePhone = employeePhone;
	}

	public Integer getEmployeeSalary() {
		return this.employeeSalary;
	}

	public void setEmployeeSalary(Integer employeeSalary) {
		this.employeeSalary = employeeSalary;
	}

	public Jobs getJob() {
		return this.job;
	}

	public void setJob(Jobs job) {
		this.job = job;
	}

	public List<Orders> getOrders() {
		return this.orders;
	}

	public void setOrders(List<Orders> orders) {
		this.orders = orders;
	}

	public Orders addOrder(Orders order) {
		getOrders().add(order);
		order.setEmployee(this);

		return order;
	}

	public Orders removeOrder(Orders order) {
		getOrders().remove(order);
		order.setEmployee(null);

		return order;
	}

}