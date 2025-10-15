package com.restaurantorders.models;

import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the orders database table.
 * 
 */
@Entity
@NamedQuery(name="Orders.findAll", query="SELECT o FROM Orders o")
public class Orders implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ORDERS_ORDERID_GENERATOR", sequenceName="ORDERS_SEQ", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ORDERS_ORDERID_GENERATOR")
	@Column(name="order_id")
	private Integer orderId;

	@Temporal(TemporalType.DATE)
	@Column(name="order_date")
	private Date orderDate;

	@Column(name="order_type")
	private String orderType;

	//bi-directional many-to-one association to Items
	@JsonIgnore
	@OneToMany(mappedBy="order")
	private List<Items> items;

	//bi-directional many-to-one association to Customers
	
	@ManyToOne
	@JoinColumn(name="customer_id")
	private Customers customer;

	//bi-directional many-to-one association to Employees
	
	@ManyToOne
	@JoinColumn(name="employee_id")
	private Employees employee;

	public Orders() {
	}

	public Integer getOrderId() {
		return this.orderId;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public Date getOrderDate() {
		return this.orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public String getOrderType() {
		return this.orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public List<Items> getItems() {
		return this.items;
	}

	public void setItems(List<Items> items) {
		this.items = items;
	}

	public Items addItem(Items item) {
		getItems().add(item);
		item.setOrder(this);

		return item;
	}

	public Items removeItem(Items item) {
		getItems().remove(item);
		item.setOrder(null);

		return item;
	}

	public Customers getCustomer() {
		return this.customer;
	}

	public void setCustomer(Customers customer) {
		this.customer = customer;
	}

	public Employees getEmployee() {
		return this.employee;
	}

	public void setEmployee(Employees employee) {
		this.employee = employee;
	}

}