# E-Commerce Back-End System

A full-stack e-commerce back-end system originally built as an exam project at Noroff. The project includes a RESTful API, a MySQL database designed in third normal form (3NF), Swagger documentation, Jest/Supertest integration tests, and a separate admin front-end interface.

---


## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Applications](#running-the-applications)
  - [Initialising the Database](#initialising-the-database)
- [API Endpoints Overview](#api-endpoints-overview)
  - [Auth](#auth)
  - [Products](#products)
  - [Categories](#categories)
  - [Brands](#brands)
  - [Cart](#cart)
  - [Orders](#orders)
  - [Search](#search)
  - [Membership](#membership)
  - [Users](#users)
  - [Roles](#roles)
- [Swagger Documentation](#swagger-documentation)
- [Admin Front-End](#admin-front-end)
- [Testing](#testing)
- [References](#references)

## Overview

The system converts a static e-commerce site into a fully dynamic back-end platform. Key features include:

- MySQL database in 3NF with Sequelize ORM
- JWT authentication (2-hour expiry) with role-based access control
- Admin and User roles with protected routes via middleware
- Membership tiers (Bronze / Silver / Gold) with automatic discount recalculation on checkout
- Soft-delete on products, with admins seeing all records and users seeing only active ones
- Raw SQL queries for product listings and search
- Price snapshot on order items to preserve pricing at time of purchase
- Unique 8-character order numbers generated at checkout
- Separate admin front-end on port 3001 using Express, EJS and Bootstrap
- Full Swagger UI at `/doc`
- Jest + Supertest CRUD test suite

## Tech Stack

**Back-end**
- Node.js / Express.js
- Sequelize ORM (MySQL2 driver)
- MySQL
- JSON Web Tokens (JWT)
- bcrypt (password hashing)
- swagger-ui-express / swagger-jsdoc

**Admin Front-end**
- Express.js
- EJS templating engine
- Bootstrap 5
- express-session

**Testing**
- Jest
- Supertest

**Planning & Documentation**
- Jira (sprints, epics, roadmap)
- draw.io (ERD)
- Swagger

## Project Structure

```
├── back-end/
│   ├── bin/www
│   ├── config/
│   │   └── database.js          # Sequelize connection
│   ├── controllers/              # Route handler logic
│   ├── middleware/               # Auth, admin checks
│   ├── models/                   # Sequelize models (one file per table)
│   │   └── index.js              # Models for all tables and associations
│   ├── routes/                   # Express routers
│   ├── services/                 # Database service files (one per table)
│   ├── tests/
│   │   └── crud.test.js          # Testing
│   ├── app.js
│   ├── package.json
│   └── readme.md
│
├── front-end/                    # Admin front-end (port 3001)
│   ├── bin/www
│   ├── middleware/
│   ├── public/stylesheets
│   │   └── style.css             # Custom Bootstrap-compatible classes for membership UI colors
│   ├── routes/
│   ├── views/                    # EJS templates
│   ├── app.js
│   ├── env_example
│   ├── package.json
│   └── readme.md
```

## Getting Started

### Prerequisites

- Node.js
- MySQL
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Lodin03/electronics-store-ecommerce.git
```

Install back-end dependencies:

```bash
cd back-end
npm install
```

Install front-end dependencies:

```bash
cd front-end
npm install
```

### Environment Variables

Create a `.env` file in the `back-end/` directory:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ecommerce_db
DB_PORT=3306
JWT_SECRET=
PORT=3000
```

Create a `.env` file in the `front-end/` directory:

```
PORT=3001
BACKEND_URL=http://localhost:3000
SESSION_SECRET=
```

### Running the Applications

Start the back-end API (port 3000):

```bash
cd back-end
npm start
```

Start the admin front-end (port 3001):

```bash
cd front-end
npm start
```

### Initialising the Database

Once the back-end is running, send a single POST request to seed the database. This only needs to be done once:

```
POST http://localhost:3000/init
```

This will:

- Create and populate all tables from the Noroff API data
- Seed the roles table (Admin = 1, User = 2)
- Seed the memberships table (Bronze / Silver / Gold)
- Create the default admin user:
  - Email: `admin@noroff.no`
  - Password: `P@ssword2023`

## API Endpoints Overview

All endpoints return JSON. Protected routes require a Bearer token in the Authorization header. Admin-only routes additionally require the requesting user to have `roleId = 1`.

### Auth

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /auth/register | Public | Register a new user |
| POST | /auth/login | Public | Login and receive JWT token |

### Products

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /products | Public | Get all products (admins see soft-deleted) |
| GET | /products/:id | Public | Get a single product with brand and category |
| POST | /products | Admin only | Add a new product |
| PUT | /products/:id | Admin only | Update a product |
| DELETE | /products/:id | Admin only | Soft-delete a product |

Product listings use raw SQL to return brand and category names alongside product data.

### Categories

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /categories | Public | Get all categories |
| GET | /categories/:id | Public | Get a category by ID |
| POST | /categories | Admin only | Add a category |
| PUT | /categories/:id | Admin only | Update a category |
| DELETE | /categories/:id | Admin only | Delete a category |

### Brands

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /brands | Public | Get all brands |
| GET | /brands/:id | Public | Get a brand by ID |
| POST | /brands | Admin only | Add a brand |
| PUT | /brands/:id | Admin only | Update a brand |
| DELETE | /brands/:id | Admin only | Delete a brand |

### Cart

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /cart | Registered user | View the current active cart |
| POST | /cart | Registered user | Add a product to the cart |
| POST | /cart/checkout/now | Registered user | Checkout the cart and create an order |

Checkout captures the unit price, applies the current membership discount, creates an order with a unique 8-character order number, and recalculates the user's membership tier.

### Orders

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /orders | Registered user | View own orders |
| GET | /orders/:id | Registered user | View a specific order and items |
| PUT | /orders/:id/status | Admin only | Update order status |

Order statuses: `In Progress`, `Ordered`, `Completed`

### Search

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /search | Public | Search products by partial name, category name, or brand name |

Uses raw SQL queries. Returns matched items and a count of results.

Request body example:

```json
{ "query": "laptop" }
```

### Membership

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /membership | Public | Get all membership tiers |

Membership tiers:

| Tier | Min items purchased | Max items purchased | Discount |
|---|---|---|---|
| Bronze | 0 | 14 | 0% |
| Silver | 15 | 29 | 15% |
| Gold | 30+ | — | 30% |

### Users

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /users | Admin only | Get all users |
| PUT | /users/:id/role | Admin only | Update a user's role |

### Roles

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /roles | Admin only | Get all roles |

## Swagger Documentation

Full interactive API documentation is available at:

```
http://localhost:3000/doc
```

All endpoints are documented with summaries, request/response schemas, security requirements, and example error responses. Tags are ordered alphabetically for easy navigation.

## Admin Front-End

The admin front-end runs separately on port 3001:

```
http://localhost:3001
```

Only admin users (`roleId = 1`) can log in. Regular users are rejected with an "Access denied" message. The session stores the JWT token, which is forwarded as a Bearer token on all requests to the back-end API.

Pages available:

| Route | Description |
|---|---|
| /products | View, search, add, edit, and soft-delete products |
| /categories | View, add, edit, and delete categories |
| /brands | View, add, edit, and delete brands |
| /orders | View all orders and update order status |
| /users | View all users and update user roles |
| /memberships | View membership tiers |

No Sequelize service files are used in the front-end — all data is fetched exclusively through back-end API endpoints.

## Testing

Tests are written with Jest and Supertest and cover the following CRUD flow:

1. Add a category `TEST_CATEGORY`
2. Add a brand `TEST_BRAND`
3. Add a product `TEST_PRODUCT` linked to `TEST_BRAND` and `TEST_CATEGORY` (price: 99.99, quantity: 10)
4. GET `TEST_PRODUCT` and verify brand and category names are returned
5. Rename `TEST_CATEGORY` → `TEST_CATEGORY2`
6. Rename `TEST_BRAND` → `TEST_BRAND2`
7. GET `TEST_PRODUCT` again and verify the updated names are reflected
8. Soft-delete `TEST_PRODUCT`

Test data uses timestamps in names (e.g. `TEST_CATEGORY_1234567890`) to avoid conflicts. All test data is cleaned up automatically in `afterAll`.

Run tests:

```bash
cd back-end
npm test
```

Make sure the back-end server is not running on port 3000 when running tests, as Supertest starts its own instance of the app.

## References

- [Bootstrap Documentation](https://getbootstrap.com/)
- [Swagger / OpenAPI Documentation](https://swagger.io/)
- [Sequelize Documentation](https://sequelize.org/)
- [Express.js Documentation](https://expressjs.com/)
- [JWT Documentation](https://jwt.io/)
- Background image: Unsplash — Glass Windows Building