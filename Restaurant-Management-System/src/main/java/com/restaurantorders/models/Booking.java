package com.restaurantorders.models;

import java.io.Serializable;



import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


/**
 * The persistent class for the booking database table.
 * 
 */
@Entity
@Table(name="booking")
@NamedQuery(name="Booking.findAll", query="SELECT b FROM Booking b")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Booking implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="BOOKING_BOOKINGID_GENERATOR", sequenceName="BOOKINGS_SEQ", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="BOOKING_BOOKINGID_GENERATOR")
	
	@Column(name="booking_id")
	private Integer bookingId;

	@Temporal(TemporalType.DATE)
	@Column(name="b_date")
	private Date bDate;

	@Column(name="b_hour")
	private Integer bHour;

	//bi-directional many-to-one association to Customers
	
	@ManyToOne
	@JoinColumn(name="customer_id")
	private Customers customer;

	//bi-directional many-to-one association to Tables
	
	@ManyToOne
	@JoinColumn(name="table_id")
	private Tables table;

	public Booking() {
	}

	public Integer getBookingId() {
		return this.bookingId;
	}

	public void setBookingId(Integer bookingId) {
		this.bookingId = bookingId;
	}

	public Date getBDate() {
		return this.bDate;
	}

	public void setBDate(Date bDate) {
		this.bDate = bDate;
	}

	public Integer getBHour() {
		return this.bHour;
	}

	public void setBHour(Integer bHour) {
		this.bHour = bHour;
	}

	public Customers getCustomer() {
		return this.customer;
	}

	public void setCustomer(Customers customer) {
		this.customer = customer;
	}

	public Tables getTable() {
		return this.table;
	}

	public void setTable(Tables table) {
		this.table = table;
	}

}