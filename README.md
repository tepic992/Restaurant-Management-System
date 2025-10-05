# Restaurant-Management-System

A scalable and modular Java-based backend system designed for restaurant management. It includes support for managing bookings, orders, customers, staff, food menus, and more.

Built using **Spring Boot** and follows a **clean layered architecture** with a focus on separation of concerns and RESTful principles.

## 📦 Project Structure

### 🧩 Domain Entities

The project includes the following Java classes, representing the core entities in the system:

|       File                              | Description |
|-------------------|---------------------------------------------------|
| `Booking.java`    | Represents a table or room booking by a customer |
| `Customers.java`  | Stores customer details and contact information |
| `Employees.java`  | Holds data about staff members (waiters, chefs, etc.) |
| `Foods.java`      | Represents individual food items available in the menu |
| `Items.java`      | Likely represents ordered items (food + quantity) |
| `Jobs.java`       | Defines roles or job positions for employees |
| `Orders.java`     | Contains customer orders (associated with items & tables) |
| `Tables.java`     | Represents tables in the restaurant or seating arrangement |

🗃️ Repository Layer

The repository layer handles data access using Spring Data JPA. Each interface extends JpaRepository, providing CRUD and custom query capabilities for the corresponding domain entity.

|       File                            | Description |
|----------------------------|----------------------------------------------|
| `BookingRepository.java`   | Handles data access for bookings |
| `CustomerRepository.java`  | Manages persistence of customer data |
| `EmployeeRepository.java`  | Performs database operations on employees |
| `FoodRepository.java`      | Access layer for menu items and food entries |
| `ItemRepository.java`      | Deals with ordered items per order |
| `JobRepository.java`       | Provides access to job/role data |
| `OrderRepository.java`     | Handles customer order persistence |
| `TableRepository.java`     | Manages table availability and layout data |

Repositories are annotated with @Repository (optional if using JpaRepository) and are automatically injected via Spring's dependency injection mechanism (@Autowired or constructor injection).

⚙️ Service Layer

The service layer contains business logic and acts as a bridge between controllers and repositories. Each service class is responsible for implementing the core behavior of the application’s operations.

| File                                  | Description |
|-------------------------|---------------------------------------------|
| `BookingService.java`   | Handles data access for bookings |
| `CustomerService.java`  | Manages persistence of customer data |
| `EmployeeService.java`  | Performs database operations on employees |
| `FoodService.java`      | Access layer for menu items and food entries |
| `ItemService.java`      | Deals with ordered items per order |
| `JobService.java`       | Provides access to job/role data |
| `OrderService.java`     | Handles customer order persistence |
| `TableService.java`     | Manages table availability and layout data |

Services are annotated with @Service and are designed to be testable.
Each service uses dependency injection to interact with the repository layer.
