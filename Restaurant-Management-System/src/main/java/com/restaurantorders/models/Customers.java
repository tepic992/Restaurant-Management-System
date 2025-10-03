package com.restaurantorders.models;

import java.io.Serializable;

import java.util.List;
import java.util.Set;

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
 * The persistent class for the customers database table.
 * 
 */
@Entity
@NamedQuery(name="Customers.findAll", query="SELECT c FROM Customers c")
public class Customers implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="CUSTOMERS_CUSTOMERID_GENERATOR", sequenceName="CUSTOMER_SEQUENCE", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="CUSTOMERS_CUSTOMERID_GENERATOR")
	@Column(name="customer_id")
	private Integer customerId;

	@Column(name="customer_address")
	private String customerAddress;

	@Column(name="customer_last_name")
	private String customerLastName;

	@Column(name="customer_name")
	private String customerName;

	@Column(name="customer_phone")
	private Integer customerPhone;

	//bi-directional many-to-one association to Bookings
	@JsonIgnore
	@OneToMany(mappedBy="customer")
	private Set<Booking> bookings;

	
	//bi-directional many-to-one association to Orders
	@JsonIgnore
	@OneToMany(mappedBy="customer")
	private Set<Orders> orders;

	public Customers() {
	}

	public Integer getCustomerId() {
		return this.customerId;
	}

	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}

	public String getCustomerAddress() {
		return this.customerAddress;
	}

	public void setCustomerAddress(String customerAddress) {
		this.customerAddress = customerAddress;
	}

	public String getCustomerLastName() {
		return this.customerLastName;
	}

	public void setCustomerLastName(String customerLastName) {
		this.customerLastName = customerLastName;
	}

	public String getCustomerName() {
		return this.customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public Integer getCustomerPhone() {
		return this.customerPhone;
	}

	public void setCustomerPhone(Integer customerPhone) {
		this.customerPhone = customerPhone;
	}

	public Set<Booking> getBookings() {
		return this.bookings;
	}

	public void setBookings(Set<Booking> bookings) {
		this.bookings = bookings;
	}

	public Booking addBooking(Booking booking) {
		getBookings().add(booking);
		booking.setCustomer(this);

		return booking;
	}

	public Booking removeBooking(Booking booking) {
		getBookings().remove(booking);
		booking.setCustomer(null);

		return booking;
	}

	public Set<Orders> getOrders() {
		return this.orders;
	}

	public void setOrders(Set<Orders> orders) {
		this.orders = orders;
	}

	public Orders addOrder(Orders order) {
		getOrders().add(order);
		order.setCustomer(this);

		return order;
	}

	public Orders removeOrder(Orders order) {
		getOrders().remove(order);
		order.setCustomer(null);

		return order;
	}

}