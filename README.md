# AUTH

## register

`/api/auth/register`

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
  "email": "test1@example.com",
  "pw": "password123"
  }'
```

### response

```json
{"message":"User registered successfully","user":{"email":"test1@example.com","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM3Mjk4OTUzLCJleHAiOjE3MzczODUzNTN9.H9c1h_DDfYVF341f1U2TX71PtE8qHl4vDyLXZt1frT0"}}%
```

## login

`/api/auth/login`

```bash
  curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
  "email": "test1@example.com",
  "pw": "password123"
  }'
```

### response

```json
{"message":"Login successful","user":{"id":"678d14087f537991a88928b4","email":"test1@example.com","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGQxNDA4N2Y1Mzc5OTFhODg5MjhiNCIsImVtYWlsIjoidGVzdDFAZXhhbXBsZS5jb20iLCJpYXQiOjE3MzcyOTg5ODMsImV4cCI6MTczNzM4NTM4M30.zlQWGzkCccQ-mxIEoUMpFkic_7V7K54Yd7rqPcLc1SE"}}%
```

# product

GET `/api/products`

```bash
 curl -X GET http://localhost:3000/api/products/
```

### response

```json
[{"_id":"678d00adc8b66454e46bc625","name":"New Product","desc":"This is a sample product description","price":19.99,"imageUrl":"http://example.com/image.jpg","owner":"678cf8c129727adc0b226bb5","createdAt":"2025-01-19T13:39:57.922Z","updatedAt":"2025-01-19T13:39:57.922Z","__v":0}]%
```

POST `/api/products`

```bash
curl -X POST http://localhost:3000/api/products \
 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGQxNDA4N2Y1Mzc5OTFhODg5MjhiNCIsImVtYWlsIjoidGVzdDFAZXhhbXBsZS5jb20iLCJpYXQiOjE3MzczMDg0ODEsImV4cCI6MTczNzM5NDg4MX0.wpT___sMzuFTWhncGfAx-54-sHbMKBK6x9CWmTUfQe8" \
 -F "name=New Product2" \
 -F "desc=This is a sampl12121221e product description" \
 -F "price=19.99" \
 -F "image=@/Users/ahmed/Downloads/test.jpg"

```

### response

```json
{"name":"New Product","desc":"This is a sample product description","price":19.99,"imageUrl":"http://example.com/image.jpg","owner":"678d14087f537991a88928b4","_id":"678d16011ba38e8227abe16b","createdAt":"2025-01-19T15:10:57.091Z","updatedAt":"2025-01-19T15:10:57.091Z","__v":0}%
```

PUT `/api/products/:id`

```bash
curl -X PUT http://localhost:3000/api/products/678d16011ba38e8227abe16b \
 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGQxNDA4N2Y1Mzc5OTFhODg5MjhiNCIsImVtYWlsIjoidGVzdDFAZXhhbXBsZS5jb20iLCJpYXQiOjE3MzczMDg0ODEsImV4cCI6MTczNzM5NDg4MX0.wpT___sMzuFTWhncGfAx-54-sHbMKBK6x9CWmTUfQe8" \
 -F "name=New Product2" \
 -F "desc=This is a sampl12121221e product description" \
 -F "price=19.99" \
 -F "image=@/Users/ahmed/Downloads/test.jpg"
```

### response

```json
{"_id":"678d16011ba38e8227abe16b","name":"Updated Product Name","desc":"Updated product description","price":29.99,"imageUrl":"http://example.com/updated-image.jpg","owner":"678d14087f537991a88928b4","createdAt":"2025-01-19T15:10:57.091Z","updatedAt":"2025-01-19T15:13:40.128Z","__v":0}%
```

DELETE `/api/products/:id`

```bash
 curl -X DELETE http://localhost:3000/api/products/678d16011ba38e8227abe16b \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGQxNDA4N2Y1Mzc5OTFhODg5MjhiNCIsImVtYWlsIjoidGVzdDFAZXhhbXBsZS5jb20iLCJpYXQiOjE3MzcyOTg5ODMsImV4cCI6MTczNzM4NTM4M30.zlQWGzkCccQ-mxIEoUMpFkic_7V7K54Yd7rqPcLc1SE"
```

### response

```json
{ "message": "Product deleted successfully" }
```
