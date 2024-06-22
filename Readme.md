# Sports Facility Booking Platform Server

Welcome to the Sports Facility Booking Platform server! This server provides endpoints to create, read, update, delete facility. And its also provide opportunity to create, read, update, delete Bookings. If a user want to book a facility he can easily book with our server. We used authentication and authorization in our server. Only authorized users can access our secure endpoints.Lets talk about how you can run this code on your computer.

## Precondition

Before running the server locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) and npm
- [Mongoose](https://mongoosejs.com/) database

### Installation

1. Clone the repository:

open your command prompt and clone the repository
git clone https://github.com/arifkhan230/sports-facility-booking-platform-server

2. Navigate to the project directory:

   ```sh
   cd your-repo-name
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

4. Create a .env file in the root directory and add your environment variables.

   ```
   NODE_ENV='development'
   DATABASE_URL=your_database_url
   PORT=5000
   BCRYPT_SALT_ROUNDS=12
   JWT_ACCESS_TOKEN=add_a_secret_code
   JWT_ACCESS_EXPIRES_IN=add_token_expires_time(example:10d)
   ```

### Running the Application

1. Now you can run the application by applying following command:

   ```sh
   npm run start:dev
   ```

# Endpoints

## Auth

### 1. Create a New User

- Endpoint: /api/auth/signup

- Method: POST

- Request Body:

```json
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "programming-hero",
  "phone": "01322901105",
  "role": "admin", // or 'user'
  "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
}
```

- Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c4",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "role": "admin",
    "phone": "01322901105",
    "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
  }
}
```

### 2. Login user

- Endpoint: /api/auth/login
- Method: POST

- Request Body:

```json
{
  "email": "web@programming-hero.com",
  "password": "programming-hero"
}
```

- Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "token": "JWT_TOKEN",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c4",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "role": "admin",
    "phone": "01322901105",
    "address": "Level-4, 34, Awal Centre, Ban Myeni, Dhaka"
  }
}
```

## Facility

### 3. Create a Facility (Admin Only)

- Endpoint:/api/facility

- Method: POST

- Headers:

```
Authorization: Bearer JWT_TOKEN
```

```json
{
  "name": "Tennis Court",
  "description": "Outdoor tennis court with synthetic surface.",
  "pricePerHour": 30,
  "location": "456 Sports Ave, Springfield"
}
```

- Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Facility added successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Tennis Court",
    "description": "Outdoor tennis court with synthetic surface.",
    "pricePerHour": 30,
    "location": "456 Sports Ave, Springfield",
    "isDeleted": false
  }
}
```

### 4. Update a Facility (Admin Only)

- Endpoint:/api/facility/:id

- Method: PUT

- Headers:

```
Authorization: Bearer JWT_TOKEN
```

- Request Body:

```json
{
  "name": "Updated Tennis Court",
  "description": "Updated outdoor tennis court with synthetic surface.",
  "pricePerHour": 35,
  "location": "789 Sports Ave, Springfield"
}
```

- Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Facility updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Updated Tennis Court",
    "description": "Updated outdoor tennis court with synthetic surface.",
    "pricePerHour": 35,
    "location": "789 Sports Ave, Springfield",
    "isDeleted": false
  }
}
```

### 5. Delete a Facility - Soft Delete (Admin Only)

- Endpoint: /api/facility/:id

- Method: DELETE

- Headers:

```
Authorization: Bearer JWT_TOKEN
```

- Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Facility deleted successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Updated Tennis Court",
    "description": "Updated outdoor tennis court with synthetic surface.",
    "pricePerHour": 35,
    "location": "789 Sports Ave, Springfield",
    "isDeleted": true
  }
}
```

### 6. Get All Facilities

- Endpoint: /api/facility

- Method: GET

- Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Facilities retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Tennis Court",
      "description": "Outdoor tennis court with synthetic surface.",
      "pricePerHour": 30,
      "location": "456 Sports Ave, Springfield",
      "isDeleted": false
    }
  ]
}
```

## Bookings

### 7. Check Availability

- Endpoint: /api/check-availability

- Method: GET

Example Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Availability checked successfully",
  "data": [
    {
      "startTime": "08:00",
      "endTime": "10:00"
    },
    {
      "startTime": "14:00",
      "endTime": "16:00"
    }
  ]
}
```

### 8. Create a Booking (User Only)

- Endpoint: /api/bookings

- Method: POST

- Headers:

```
Authorization: Bearer JWT_TOKEN
```

- Request body:

```json
{
  "facility": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-06-15",
  "startTime": "10:00",
  "endTime": "13:00"
}
```

- Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c6",
    "facility": "60d9c4e4f3b4b544b8b8d1c5",
    "date": "2024-06-15",
    "startTime": "10:00",
    "endTime": "13:00",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "payableAmount": 90,
    "isBooked": "confirmed"
  }
}
```

### 9. View All Bookings (Admin Only)

- Endpoint: /api/bookings

- Method: GET

- Headers:

```
Authorization: Bearer JWT_TOKEN
```

- Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": {
        "_id": "60d9c4e4f3b4b544b8b8d1c4",
        "name": "Programming Hero",
        "email": "programming.hero@example.com",
        "phone": "+1234567890",
        "role": "user",
        "address": "456 Elm Street"
      },
      "payableAmount": 90,
      "isBooked": " confirmed"
    }
  ]
}
```

### 10. View Bookings by User (User Only)

- Endpoint: /api/bookings/user

- Method: GET

- Headers:

```
Authorization: Bearer JWT_TOKEN
```

- Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": "60d9c4e4f3b4b544b8b8d1c4",
      "payableAmount": 90,
      "isBooked": " confirmed"
    }
  ]
}
```

### 11. Cancel a Booking (User Only)

- Endpoint: /api/bookings/:id

- Method: DELETE

- Headers:

```
Authorization: Bearer JWT_TOKEN
```

- Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking cancelled successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c6",
    "facility": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Tennis Court",
      "description": "Outdoor tennis court with professional-grade surface.",
      "pricePerHour": 30,
      "location": "123 Main Street",
      "isDeleted": false
    },
    "date": "2024-06-15",
    "startTime": "10:00",
    "endTime": "13:00",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "payableAmount": 90,
    "isBooked": "canceled"
  }
}
```
