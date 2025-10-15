DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS tables CASCADE;
DROP TABLE IF EXISTS foods CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS booking CASCADE;

DROP SEQUENCE IF EXISTS jobs_seq;
DROP SEQUENCE IF EXISTS employees_seq;
DROP SEQUENCE IF EXISTS tables_seq;
DROP SEQUENCE IF EXISTS foods_seq;
DROP SEQUENCE IF EXISTS customers_seq;
DROP SEQUENCE IF EXISTS orders_seq;
DROP SEQUENCE IF EXISTS items_seq;
DROP SEQUENCE IF EXISTS booking_seq;

CREATE TABLE jobs(
	job_id integer NOT NULL,
	job_title VARCHAR (10) NOT NULL,
	
	CONSTRAINT jobs_id_pk PRIMARY KEY (job_id)
);

CREATE TABLE employees(
	employee_id integer NOT NULL,
	employee_name VARCHAR (20) NOT NULL,
        employee_last_name VARCHAR (30) NOT NULL,
	employee_phone integer NOT NULL,
	employee_address VARCHAR (25) NOT NULL,
	employee_salary integer NOT NULL,
	job_id integer NOT NULL,
	
	CONSTRAINT employees_id_pk PRIMARY KEY (employee_id),
	CONSTRAINT employees_job_id_fk FOREIGN KEY (job_id) REFERENCES jobs (job_id)
);

CREATE TABLE tables(
	table_id integer NOT NULL,
	capacity integer NOT NULL,
	employee_id integer NOT NULL,
	
	CONSTRAINT tables_t_id_pk PRIMARY KEY (table_id),
	CONSTRAINT tables_e_id_fk FOREIGN KEY (employee_id) REFERENCES employees (employee_id)
);

CREATE TABLE foods(
	food_id integer NOT NULL,
	food_name VARCHAR (10) NOT NULL,
	food_price integer NOT NULL,
	employee_id integer NOT NULL,
	
	CONSTRAINT foods_f_id_pk PRIMARY KEY (food_id),
	CONSTRAINT foods_e_id_fk FOREIGN KEY (employee_id) REFERENCES employees (employee_id)
);

CREATE TABLE customers(
	customer_id integer NOT NULL,
	customer_name VARCHAR NOT NULL,
	customer_last_name VARCHAR NOT NULL,
	customer_phone integer NOT NULL,
	customer_address VARCHAR(25),

	CONSTRAINT customers_c_id_pk PRIMARY KEY (customer_id)
);

CREATE TABLE orders(
	order_id integer NOT NULL,
	order_type VARCHAR (10),
	order_date DATE NOT NULL,
	customer_id integer NOT NULL,
	employee_id integer NOT NULL,
	
	CONSTRAINT orders_o_id_pk PRIMARY KEY (order_id),
	CONSTRAINT orders_cid_fk FOREIGN KEY (customer_id) REFERENCES customers (customer_id),
	CONSTRAINT orders_eid_fk FOREIGN KEY (employee_id) REFERENCES employees (employee_id)
);


CREATE TABLE items(
	item_id integer NOT NULL,
	quantity integer NOT NULL,
	order_id integer NOT NULL,
	food_id integer NOT NULL,
	
	CONSTRAINT items_pk PRIMARY KEY (item_id),
	CONSTRAINT items_oid_fk FOREIGN KEY (order_id) REFERENCES orders (order_id),
	CONSTRAINT items_fid_fk FOREIGN KEY (food_id) REFERENCES foods (food_id)
);

CREATE TABLE booking(
	booking_id integer NOT NULL,
	b_date DATE NOT NULL,
	b_hour integer NOT NULL,
	customer_id integer NOT NULL,
	table_id integer NOT NULL,
	
	CONSTRAINT booking_pk PRIMARY KEY (booking_id),
	CONSTRAINT booing_cid_fk FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
	CONSTRAINT booing_tid_fk FOREIGN KEY (table_id) REFERENCES tables (table_id)
);



CREATE SEQUENCE jobs_seq
START WITH 1
INCREMENT 1;
CREATE SEQUENCE employees_seq
START WITH 100
INCREMENT 1;
CREATE SEQUENCE tables_seq
START WITH 10
INCREMENT 1;
CREATE SEQUENCE foods_seq
START WITH 20
INCREMENT 1;
CREATE SEQUENCE customers_seq
START WITH 1
INCREMENT 1;
CREATE SEQUENCE orders_seq
START WITH 1
INCREMENT 1;
CREATE SEQUENCE items_seq
START WITH 1
INCREMENT 1;
CREATE SEQUENCE booking_seq
START WITH 1
INCREMENT 1;