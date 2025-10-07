🍽️ Restaurant Management System

Fullstack aplikacija za upravljanje restoranom — razvijena pomoću Java Spring Boot, Angular i PostgreSQL.
Omogućava menadžment narudžbina, zaposlenih, stolova, hrane i rezervacija u realnom vremenu.

------------------------------------------------------------

🛠️ Tehnologije

| Backend         | Frontend         | Baza podataka |
|-----------------|------------------|----------------|
| Java 17         | Angular           | PostgreSQL     |
| Spring Boot     | TypeScript        | pgAdmin        |
| Spring Data JPA | RxJS, SCSS        | Hibernate      |
| Maven           | Angular Material  | Flyway (opciono) |

------------------------------------------------------------

📌 Ključne funkcionalnosti

- Upravljanje korisnicima (gosti)
- Upravljanje zaposlenima i njihovim poslovima
- Upravljanje menijem (hrana i piće)
- Upravljanje stolovima i rezervacijama
- Kreiranje i praćenje narudžbina
- REST API komunikacija između Angular frontenda i Spring backenda

------------------------------------------------------------

📁 Struktura projekta

restaurant-management-system/
├── backend/
│   ├── src/main/java/com.restaurantorders/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── repositories/
│   │   └── RestaurantManagementSystemApplication.java
│   └── src/main/resources/
│       └── application.properties
├── frontend/
│   └── (Angular aplikacija - komponente, servisi, moduli itd.)
└── README.txt

------------------------------------------------------------

⚙️ Pokretanje aplikacije

🔹 Backend (Spring Boot)

1. Kloniraj repozitorijum i uđi u backend folder:
   git clone https://github.com/korisnicko-ime/restaurant-management-system.git
   cd restaurant-management-system/backend

2. Konfiguriši application.properties:
   spring.datasource.url=jdbc:postgresql://localhost:5432/restaurantdb
   spring.datasource.username=postgres
   spring.datasource.password=lozinka
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true

3. Pokreni aplikaciju:
   mvn spring-boot:run

🔹 Frontend (Angular)

1. Uđi u frontend folder:
   cd ../frontend

2. Instaliraj zavisnosti:
   npm install

3. Pokreni Angular aplikaciju:
   ng serve

4. Otvori browser i idi na: http://localhost:4200

------------------------------------------------------------

🔗 API Krajnje tačke (primjeri)

| Metod | Putanja                  | Opis                    |
|-------|---------------------------|-------------------------|
| GET   | /api/foods                | Lista hrane             |
| POST  | /api/orders               | Kreiranje narudžbine    |
| GET   | /api/employees            | Lista zaposlenih        |
| GET   | /api/tables/availability  | Slobodni stolovi        |
| POST  | /api/bookings             | Rezervacija stola       |

------------------------------------------------------------

🧠 Moguća unapređenja

- Autentikacija i autorizacija (JWT, role-based)
- Dashboard za menadžment
- Generisanje PDF računa
- Responsive dizajn za mobilne uređaje
- Testiranje (JUnit, Mockito, Karma, Jasmine)
- Deployment u Docker, Render, Heroku itd.