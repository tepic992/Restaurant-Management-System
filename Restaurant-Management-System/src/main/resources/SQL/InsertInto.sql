alter sequence jobs_seq
restart with 1;
alter sequence employees_seq
restart with 100;
alter sequence tables_seq
restart with 10;
alter sequence foods_seq
restart with 20;
alter sequence customers_seq
restart with 1;
alter sequence orders_seq
restart with 1;
alter sequence items_seq
restart with 1;
alter sequence booking_seq
restart with 1;
INSERT INTO jobs (job_id, job_title) VALUES (nextval('jobs_seq'), 'WAITER');
INSERT INTO jobs (job_id, job_title) VALUES (nextval('jobs_seq'), 'COOK');
INSERT INTO jobs (job_id, job_title) VALUES (nextval('jobs_seq'), 'CLEANER');
INSERT INTO jobs (job_id, job_title) VALUES (nextval('jobs_seq'), 'CASHIER');

INSERT INTO employees (employee_id, employee_name, employee_last_name, employee_phone, employee_address, employee_salary, job_id) VALUES (nextval('employees_seq'), 'Petar', 'Petrovic', 01788523695, 'Svetosavska 7', 40000, 1);
INSERT INTO employees (employee_id, employee_name, employee_last_name, employee_phone, employee_address, employee_salary, job_id) VALUES (nextval('employees_seq'), 'Djordje', 'Djordjevic', 01756295398, 'Bore Prodanovica 15', 40000, 1);
INSERT INTO employees (employee_id, employee_name, employee_last_name, employee_phone, employee_address, employee_salary, job_id) VALUES (nextval('employees_seq'), 'Nemanja', 'Petric', 01653269852, 'Janka Cmelika 8', 40000, 1);
INSERT INTO employees (employee_id, employee_name, employee_last_name, employee_phone, employee_address, employee_salary, job_id) VALUES (nextval('employees_seq'), 'Predrag', 'Predic', 01856296541, 'Vidovdanska 14', 45000, 2);
INSERT INTO employees (employee_id, employee_name, employee_last_name, employee_phone, employee_address, employee_salary, job_id) VALUES (nextval('employees_seq'), 'Zoran', 'Zoric', 01856243521, 'Cirpanova 10', 50000, 2);
INSERT INTO employees (employee_id, employee_name, employee_last_name, employee_phone, employee_address, employee_salary, job_id) VALUES (nextval('employees_seq'), 'Stefan', 'Stefanovic', 01854296781, 'Futoska 90', 35000, 3);
INSERT INTO employees (employee_id, employee_name, employee_last_name, employee_phone, employee_address, employee_salary, job_id) VALUES (nextval('employees_seq'), 'Nikola', 'Nikolic', 01854183141, 'Futoska 25', 35000, 3);
INSERT INTO employees (employee_id, employee_name, employee_last_name, employee_phone, employee_address, employee_salary, job_id) VALUES (nextval('employees_seq'), 'Danilo', 'Danilovic', 01855892211, 'Jevrejska 9', 60000, 4);
INSERT INTO employees (employee_id, employee_name, employee_last_name, employee_phone, employee_address, employee_salary, job_id) VALUES (nextval('employees_seq'), 'Marko', 'Mirkovic', 01855892499, 'Partizanska 1', 60000, 4);

INSERT INTO tables (table_id, capacity, employee_id) VALUES (nextval('tables_seq'), 4, 100);
INSERT INTO tables (table_id, capacity, employee_id) VALUES (nextval('tables_seq'), 6, 100);
INSERT INTO tables (table_id, capacity, employee_id) VALUES (nextval('tables_seq'), 2, 101);
INSERT INTO tables (table_id, capacity, employee_id) VALUES (nextval('tables_seq'), 10, 101);
INSERT INTO tables (table_id, capacity, employee_id) VALUES (nextval('tables_seq'), 4, 102);
INSERT INTO tables (table_id, capacity, employee_id) VALUES (nextval('tables_seq'), 10, 102);

INSERT INTO foods (food_id, food_name, food_price, employee_id) VALUES (nextval('foods_seq'), 'BURGER', 450, 103);
INSERT INTO foods (food_id, food_name, food_price, employee_id) VALUES (nextval('foods_seq'), 'SANDWICH', 180, 103);
INSERT INTO foods (food_id, food_name, food_price, employee_id) VALUES (nextval('foods_seq'), 'PIZZA', 880, 104);
INSERT INTO foods (food_id, food_name, food_price, employee_id) VALUES (nextval('foods_seq'), 'PASTA', 600, 104);

INSERT INTO customers (customer_id, customer_name, customer_last_name, customer_address, customer_phone) VALUES (nextval('customers_seq'), 'Milan', 'Milanovic', 'Marka Kraljevica 26', 01788283311);
INSERT INTO customers (customer_id, customer_name, customer_last_name, customer_address, customer_phone) VALUES (nextval('customers_seq'), 'Milos', 'Milosevic', 'Cara Dusana 32', 01788265221);
INSERT INTO customers (customer_id, customer_name, customer_last_name, customer_address, customer_phone) VALUES (nextval('customers_seq'), 'Nikola', 'Stefanovic', 'Svetosavska 1', 01521301871);
INSERT INTO customers (customer_id, customer_name, customer_last_name, customer_address, customer_phone) VALUES (nextval('customers_seq'), 'Zorana', 'Milutinovic', 'Maksima Gorkog 3', 01521318596);
INSERT INTO customers (customer_id, customer_name, customer_last_name, customer_address, customer_phone) VALUES (nextval('customers_seq'), 'Aleksandra', 'Cupic', 'Brace Ribnikara 7', 01773709191);
INSERT INTO customers (customer_id, customer_name, customer_last_name, customer_address, customer_phone) VALUES (nextval('customers_seq'), 'Igor', 'Milanovic', 'Miseluk 4', 01554369526);


INSERT INTO orders (order_id, order_type, order_date, customer_id, employee_id) VALUES (nextval('orders_seq'), 'IN HOUSE', '12-12-2022', 1, 107);
INSERT INTO orders (order_id, order_type, order_date, customer_id, employee_id) VALUES (nextval('orders_seq'), 'PARCEL', '12-12-2022', 1, 101);
INSERT INTO orders (order_id, order_type, order_date, customer_id, employee_id) VALUES (nextval('orders_seq'), 'IN HOUSE', '12-13-2022', 1, 107);
INSERT INTO orders (order_id, order_type, order_date, customer_id, employee_id) VALUES (nextval('orders_seq'), 'IN HOUSE', '12-14-2022', 2, 107);
INSERT INTO orders (order_id, order_type, order_date, customer_id, employee_id) VALUES (nextval('orders_seq'), 'PARCEL', '12-14-2022', 2, 108);
INSERT INTO orders (order_id, order_type, order_date, customer_id, employee_id) VALUES (nextval('orders_seq'), 'PARCEL', '12-14-2022', 2, 102);
INSERT INTO orders (order_id, order_type, order_date, customer_id, employee_id) VALUES (nextval('orders_seq'), 'IN HOUSE', '12-14-2022', 3, 101);
INSERT INTO orders (order_id, order_type, order_date, customer_id, employee_id) VALUES (nextval('orders_seq'), 'PARCEL', '12-14-2022', 3, 107);
INSERT INTO orders (order_id, order_type, order_date, customer_id, employee_id) VALUES (nextval('orders_seq'), 'IN HOUSE', '12-14-2022', 3, 101);
INSERT INTO orders (order_id, order_type, order_date, customer_id, employee_id) VALUES (nextval('orders_seq'), 'PARCEL', '12-14-2022', 4, 102);
INSERT INTO orders (order_id, order_type, order_date, customer_id, employee_id) VALUES (nextval('orders_seq'), 'IN HOUSE', '12-14-2022', 4, 102);
INSERT INTO orders (order_id, order_type, order_date, customer_id, employee_id) VALUES (nextval('orders_seq'), 'PARCEL', '12-14-2022', 4, 102);
INSERT INTO orders (order_id, order_type, order_date, customer_id, employee_id) VALUES (nextval('orders_seq'), 'PARCEL', '12-14-2022', 4, 103);
INSERT INTO orders (order_id, order_type, order_date, customer_id, employee_id) VALUES (nextval('orders_seq'), 'IN HOUSE', '12-14-2022', 4, 103);
INSERT INTO orders (order_id, order_type, order_date, customer_id, employee_id) VALUES (nextval('orders_seq'), 'PARCEL', '12-14-2022', 5, 101);
INSERT INTO orders (order_id, order_type, order_date, customer_id, employee_id) VALUES (nextval('orders_seq'), 'IN HOUSE', '12-14-2022', 5, 102);

INSERT INTO items (item_id, order_id, food_id, quantity) VALUES (nextval('items_seq'), 2, 20, 4);
INSERT INTO items (item_id, order_id, food_id, quantity) VALUES (nextval('items_seq'), 2, 20, 4);
INSERT INTO items (item_id, order_id, food_id, quantity) VALUES (nextval('items_seq'), 3, 20, 6);
INSERT INTO items (item_id, order_id, food_id, quantity) VALUES (nextval('items_seq'), 3, 20, 8);
INSERT INTO items (item_id, order_id, food_id, quantity) VALUES (nextval('items_seq'), 4, 21, 2);
INSERT INTO items (item_id, order_id, food_id, quantity) VALUES (nextval('items_seq'), 4, 21, 4);
INSERT INTO items (item_id, order_id, food_id, quantity) VALUES (nextval('items_seq'), 4, 21, 4);
INSERT INTO items (item_id, order_id, food_id, quantity) VALUES (nextval('items_seq'), 5, 21, 8);
INSERT INTO items (item_id, order_id, food_id, quantity) VALUES (nextval('items_seq'), 5, 22, 10);
INSERT INTO items (item_id, order_id, food_id, quantity) VALUES (nextval('items_seq'), 6, 22, 12);
INSERT INTO items (item_id, order_id, food_id, quantity) VALUES (nextval('items_seq'), 6, 22, 2);
INSERT INTO items (item_id, order_id, food_id, quantity) VALUES (nextval('items_seq'), 7, 23, 4);
INSERT INTO items (item_id, order_id, food_id, quantity) VALUES (nextval('items_seq'), 8, 23, 6);
INSERT INTO items (item_id, order_id, food_id, quantity) VALUES (nextval('items_seq'), 9, 23, 2);

INSERT INTO booking (booking_id, b_date, b_hour, customer_id, table_id) VALUES (nextval('booking_seq'), '12-12-2022', 2, 1, 10);
INSERT INTO booking (booking_id, b_date, b_hour, customer_id, table_id) VALUES (nextval('booking_seq'), '12-13-2022', 1, 2, 11);
INSERT INTO booking (booking_id, b_date, b_hour, customer_id, table_id) VALUES (nextval('booking_seq'), '12-14-2022', 6, 3, 12);
INSERT INTO booking (booking_id, b_date, b_hour, customer_id, table_id) VALUES (nextval('booking_seq'), '12-12-2022', 2, 3, 11);
INSERT INTO booking (booking_id, b_date, b_hour, customer_id, table_id) VALUES (nextval('booking_seq'), '12-13-2022', 1, 4, 12);
INSERT INTO booking (booking_id, b_date, b_hour, customer_id, table_id) VALUES (nextval('booking_seq'), '12-14-2022', 6, 5, 13);
INSERT INTO booking (booking_id, b_date, b_hour, customer_id, table_id) VALUES (nextval('booking_seq'), '12-13-2022', 1, 5, 14);