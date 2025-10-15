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
 * The persistent class for the foods database table.
 * 
 */
@Entity
@NamedQuery(name="Foods.findAll", query="SELECT f FROM Foods f")
public class Foods implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="FOODS_FOODID_GENERATOR", sequenceName="FOODS_SEQ", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="FOODS_FOODID_GENERATOR")
	@Column(name="food_id")
	private Integer foodId;

	
	@ManyToOne
	@JoinColumn(name="employee_id")
	private Employees employee;

	@Column(name="food_name")
	private String foodName;

	@Column(name="food_price")
	private Integer foodPrice;

	//bi-directional many-to-one association to Items
	@JsonIgnore
	@OneToMany(mappedBy="food")
	private List<Items> items;

	public Foods() {
	}

	public Integer getFoodId() {
		return this.foodId;
	}

	public void setFoodId(Integer foodId) {
		this.foodId = foodId;
	}

	

	public Employees getEmployee() {
		return employee;
	}

	public void setEmployee(Employees employee) {
		this.employee = employee;
	}

	public String getFoodName() {
		return this.foodName;
	}

	public void setFoodName(String foodName) {
		this.foodName = foodName;
	}

	public Integer getFoodPrice() {
		return this.foodPrice;
	}

	public void setFoodPrice(Integer foodPrice) {
		this.foodPrice = foodPrice;
	}

	public List<Items> getItems() {
		return this.items;
	}

	public void setItems(List<Items> items) {
		this.items = items;
	}

	public Items addItem(Items item) {
		getItems().add(item);
		item.setFood(this);

		return item;
	}

	public Items removeItem(Items item) {
		getItems().remove(item);
		item.setFood(null);

		return item;
	}

}