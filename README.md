# ProductHub - Modern Product Management System

A full-stack product management application with a professional UI and secure backend. Built with React and Spring Boot.

![ProductHub](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.0-brightgreen)
![Java](https://img.shields.io/badge/Java-17-orange)

## 🚀 Features

### Frontend
- **Modern UI/UX**: Beautiful gradient design with smooth animations
- **Professional Landing Page**: Complete with features, about, and footer sections
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Authentication**: Secure login and registration with validation
- **Product Management**: Create, read, update, and delete products
- **Error Handling**: User-friendly error messages and loading states

### Backend
- **RESTful API**: Clean and well-documented endpoints
- **JWT Authentication**: Secure token-based authentication
- **Simple Authorization**: Single USER role for all authenticated users
- **Input Validation**: Request validation using Jakarta Bean Validation
- **Global Exception Handling**: Centralized error handling
- **Logging**: Comprehensive logging throughout the application
- **Transaction Management**: Proper database transaction handling

## 🛠️ Technology Stack

### Frontend
- React 19.2.0
- React Router DOM 7.9.6
- Axios 1.13.2
- CSS3 with modern features

### Backend
- Java 17
- Spring Boot 4.0.0
- Spring Security
- Spring Data JPA
- H2 Database
- JWT (JSON Web Tokens)
- Lombok
- Maven

## 📋 Prerequisites

- **Node.js** 16+ and npm
- **Java** 17+
- **Maven** 3.6+

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd product-service
```

### 2. Start the Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Start the Frontend

```bash
cd frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000`

### 4. Access the Application

Open your browser and navigate to `http://localhost:3000`

## 🐳 Docker Deployment

### Using Docker Compose

```bash
docker-compose up --build
```

This will start both frontend and backend services:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`

## 📁 Project Structure

```
product-service/
├── backend/                    # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/productapp/
│   │   │   │       ├── config/          # Security & JWT config
│   │   │   │       ├── controller/      # REST controllers
│   │   │   │       ├── dto/             # Data Transfer Objects
│   │   │   │       ├── exception/       # Exception handling
│   │   │   │       ├── model/           # JPA entities
│   │   │   │       ├── repository/      # Data repositories
│   │   │   │       └── service/         # Business logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   └── README.md
│
├── frontend/                   # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── ProductList.js
│   │   │   └── ProductForm.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
├── docker-compose.yml
└── README.md
```

## 🔐 API Documentation

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john",
  "password": "password123",
  "roles": "ROLE_USER"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "john",
  "password": "password123"
}
```

### Product Endpoints

All product endpoints require JWT authentication.

#### Get All Products
```http
GET /api/products
Authorization: Bearer <token>
```

#### Get Product by ID
```http
GET /api/products/{id}
Authorization: Bearer <token>
```

#### Create Product
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99
}
```

#### Update Product
```http
PUT /api/products/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated Description",
  "price": 149.99
}
```

#### Delete Product
```http
DELETE /api/products/{id}
Authorization: Bearer <token>
```

## 🎨 UI Features

- **Landing Page**: Professional hero section with statistics and features
- **Authentication**: Modern login/register forms with validation
- **Product Grid**: Card-based layout with hover effects
- **Responsive Navigation**: Fixed navbar with smooth scrolling
- **Professional Footer**: Complete with links and social media
- **Loading States**: Visual feedback during operations
- **Error Messages**: User-friendly error notifications

## 🔒 Security Features

- Password encryption using BCrypt
- JWT token-based authentication
- Role-based access control
- CORS configuration
- Stateless session management
- Input validation on both frontend and backend

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 Configuration

### Backend Configuration
Edit `backend/src/main/resources/application.properties`:

```properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:h2:mem:testdb

# JWT
jwt.secret=your-secret-key
jwt.expiration=36000000

# Logging
logging.level.com.example.productapp=DEBUG
```

### Frontend Configuration
The frontend is configured to connect to `http://localhost:8080` by default. Update API URLs in component files if needed.

## 🚀 Production Deployment

### Backend
1. Update `application.properties` with production database
2. Change JWT secret key
3. Build: `mvn clean package`
4. Deploy the JAR file from `target/` directory

### Frontend
1. Build: `npm run build`
2. Deploy the `build/` directory to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the amazing library
- All contributors who help improve this project

## 📞 Support

For support, email support@producthub.com or open an issue in the repository.
