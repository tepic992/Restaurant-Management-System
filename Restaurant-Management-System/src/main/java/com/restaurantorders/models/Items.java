package com.restaurantorders.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the items database table.
 * 
 */
@Entity
@NamedQuery(name="Items.findAll", query="SELECT i FROM Items i")
public class Items implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ITEMS_ITEMID_GENERATOR", sequenceName="ITEM_SEQUENCE", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ITEMS_ITEMID_GENERATOR")
	@Column(name="item_id")
	private Integer itemId;

	private Integer quantity;

	//bi-directional many-to-one association to Foods
	
	@ManyToOne
	@JoinColumn(name="food_id")
	private Foods food;

	//bi-directional many-to-one association to Orders
	
	@ManyToOne
	@JoinColumn(name="order_id")
	private Orders order;

	public Items() {
	}

	public Integer getItemId() {
		return this.itemId;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}

	public Integer getQuantity() {
		return this.quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Foods getFood() {
		return this.food;
	}

	public void setFood(Foods food) {
		this.food = food;
	}

	public Orders getOrder() {
		return this.order;
	}

	public void setOrder(Orders order) {
		this.order = order;
	}

}