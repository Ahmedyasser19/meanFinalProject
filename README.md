# Requirments

## server

### AUTH

- `/api/auth/register`
  curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
  "email": "test@example.com",
  "pw": "password123"
  }'

- `/api/auth/login`
  curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
  "email": "test@example.com",
  "pw": "password123"
  }'

### product

- GET `/api/products` curl -X GET http://localhost:3000/api/products/
- POST `/api/products`
  curl -X POST http://localhost:3000/api/products/ \
   -H "Content-Type: application/json" \
   -d '{"username": "testuser", "password": "123456"}'
- PUT `/api/products/:id`
- DELETE `/api/products/:id`

## client

### components

- ProductListComponentx
  - Displays a list of products with their `name`, `description`, `price`, and `image`.
  - Uses `property binding`
- ProductFormComponent
