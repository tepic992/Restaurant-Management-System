🍽 Restaurant Management System
==============================

Full-stack aplikacija za upravljanje restoranom koja kombinuje Java Spring Boot i Angular.
Omogućava upravljanje menijem, stolovima, narudžbinama, rezervacijama i zaposlenima.

------------------------------------------------------------

🛠 Tehnologije i alati

- Java / Spring Boot (backend)
- Angular (frontend)
- TypeScript, HTML, SCSS
- REST API komunikacija
- PostgreSQL ili druga relacijska baza (pretpostavka)
- Maven, npm

------------------------------------------------------------

📌 Ključne funkcionalnosti (pretpostavljene)

- Upravljanje menijem (hrana i piće)
- Upravljanje zaposlenima
- Upravljanje stolovima i rezervacijama
- Kreiranje i praćenje narudžbina
- REST API komunikacija između frontenda i backenda

------------------------------------------------------------

🚀 Pokretanje aplikacije

1. Kloniraj repozitorijum:
   git clone https://github.com/tepic992/Restaurant-Management-System.git
   cd Restaurant-Management-System

2. Backend:
   - Uđi u folder
   - Podesi application.properties (baza podataka, port, itd.)
   - Pokreni aplikaciju:
     mvn spring-boot:run

3. Frontend:
   cd rest-orders-frontend
   npm install
   ng serve

4. Otvori aplikaciju u browseru:
   http://localhost:4200

------------------------------------------------------------

🔗 REST API 

- GET    /api/foods            
- POST   /api/orders           
- GET    /api/employees         
- GET    /api/tables           
- POST   /api/bookings  


------------------------------------------------------------

📈 Predlozi za buduća unapređenja

- Administratorski dashboard sa statistikama
- Generisanje PDF računa za goste


