# ProductHub - Architecture Documentation

## Project Structure

```
product-service/
├── backend/                                    # Spring Boot Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/example/productapp/
│   │       │   ├── config/                    # Configuration Classes
│   │       │   │   ├── JwtRequestFilter.java  # JWT authentication filter
│   │       │   │   ├── JwtUtil.java           # JWT utility methods
│   │       │   │   └── SecurityConfig.java    # Spring Security configuration
│   │       │   │
│   │       │   ├── controller/                # REST Controllers
│   │       │   │   ├── AuthController.java    # Authentication endpoints
│   │       │   │   └── ProductController.java # Product CRUD endpoints
│   │       │   │
│   │       │   ├── dto/                       # Data Transfer Objects
│   │       │   │   ├── AuthRequest.java       # Login request DTO
│   │       │   │   ├── AuthResponse.java      # Login response DTO
│   │       │   │   ├── MessageResponse.java   # Generic message response
│   │       │   │   ├── ProductDTO.java        # Product DTO with validation
│   │       │   │   └── RegisterRequest.java   # Registration request DTO
│   │       │   │
│   │       │   ├── exception/                 # Exception Handling
│   │       │   │   ├── DuplicateResourceException.java
│   │       │   │   ├── ErrorResponse.java     # Error response structure
│   │       │   │   ├── GlobalExceptionHandler.java  # Global exception handler
│   │       │   │   └── ResourceNotFoundException.java
│   │       │   │
│   │       │   ├── model/                     # JPA Entities
│   │       │   │   ├── Product.java           # Product entity
│   │       │   │   └── User.java              # User entity
│   │       │   │
│   │       │   ├── repository/                # Data Access Layer
│   │       │   │   ├── ProductRepository.java # Product repository
│   │       │   │   └── UserRepository.java    # User repository
│   │       │   │
│   │       │   ├── service/                   # Business Logic Layer
│   │       │   │   ├── ProductService.java    # Product business logic
│   │       │   │   └── UserDetailsServiceImpl.java  # User authentication service
│   │       │   │
│   │       │   └── ProductAppApplication.java # Main application class
│   │       │
│   │       └── resources/
│   │           └── application.properties     # Application configuration
│   │
│   ├── pom.xml                                # Maven dependencies
│   └── README.md                              # Backend documentation
│
├── frontend/                                   # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   │
│   ├── src/
│   │   ├── components/                        # React Components
│   │   │   ├── LandingPage.js                # Landing page with hero, features, footer
│   │   │   ├── Login.js                      # Login form
│   │   │   ├── Register.js                   # Registration form
│   │   │   ├── ProductList.js                # Product listing page
│   │   │   └── ProductForm.js                # Product create/edit form
│   │   │
│   │   ├── App.js                            # Main app component with routing
│   │   ├── App.css                           # Application styles
│   │   ├── index.js                          # React entry point
│   │   └── index.css                         # Global styles
│   │
│   ├── package.json                          # NPM dependencies
│   └── README.md                             # Frontend documentation
│
├── docker-compose.yml                         # Docker orchestration
├── README.md                                  # Main project documentation
└── ARCHITECTURE.md                            # This file

```

## Backend Architecture

### Layered Architecture

The backend follows a clean layered architecture:

1. **Controller Layer** (`controller/`)
   - Handles HTTP requests and responses
   - Input validation using Jakarta Bean Validation
   - Maps DTOs to domain models
   - Returns appropriate HTTP status codes

2. **Service Layer** (`service/`)
   - Contains business logic
   - Transaction management
   - Orchestrates repository calls
   - Throws domain-specific exceptions

3. **Repository Layer** (`repository/`)
   - Data access using Spring Data JPA
   - Extends JpaRepository for CRUD operations
   - Custom query methods

4. **Model Layer** (`model/`)
   - JPA entities representing database tables
   - Lombok annotations for boilerplate code
   - Validation constraints

### Cross-Cutting Concerns

1. **Security** (`config/`)
   - JWT-based authentication
   - Stateless session management
   - BCrypt password encoding
   - Role-based access control

2. **Exception Handling** (`exception/`)
   - Global exception handler using @RestControllerAdvice
   - Custom exceptions for domain-specific errors
   - Structured error responses

3. **DTOs** (`dto/`)
   - Separate request/response objects
   - Input validation annotations
   - Decouples API contract from domain models

## Frontend Architecture

### Component Structure

1. **Pages**
   - LandingPage: Marketing page with features and CTAs
   - Login/Register: Authentication pages
   - ProductList: Product management dashboard
   - ProductForm: Product creation and editing

2. **Routing**
   - React Router DOM for navigation
   - Protected routes requiring authentication
   - Redirect logic for unauthorized access

3. **State Management**
   - Local component state using useState
   - localStorage for JWT token persistence
   - Axios for API communication

### Styling

- Modern CSS3 with gradients and animations
- Responsive design using media queries
- Component-scoped styles
- Consistent color scheme and typography

## Data Flow

### Authentication Flow

```
1. User submits credentials → Frontend
2. Frontend sends POST /api/auth/login → Backend
3. Backend validates credentials
4. Backend generates JWT token
5. Backend returns token → Frontend
6. Frontend stores token in localStorage
7. Frontend includes token in subsequent requests
```

### Product CRUD Flow

```
1. User action (create/read/update/delete) → Frontend
2. Frontend sends request with JWT token → Backend
3. JwtRequestFilter validates token
4. SecurityConfig authorizes request
5. Controller validates input
6. Service executes business logic
7. Repository performs database operation
8. Response flows back through layers
9. Frontend updates UI
```

## Security

### Authentication
- JWT tokens with 10-hour expiration
- Tokens stored in localStorage
- Bearer token authentication

### Authorization
- All authenticated users have USER role
- Full access to product management features
- Stateless session management

### Password Security
- BCrypt hashing with salt
- Minimum password length validation
- Passwords never logged or exposed

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    roles VARCHAR(255) NOT NULL
);
```

### Products Table
```sql
CREATE TABLE product (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DOUBLE NOT NULL
);
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products (Requires Authentication)
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

## Technology Stack

### Backend
- **Framework**: Spring Boot 4.0.0
- **Language**: Java 17
- **Security**: Spring Security + JWT
- **Database**: H2 (in-memory)
- **ORM**: Spring Data JPA
- **Build Tool**: Maven
- **Utilities**: Lombok

### Frontend
- **Library**: React 19.2.0
- **Routing**: React Router DOM 7.9.6
- **HTTP Client**: Axios 1.13.2
- **Styling**: CSS3
- **Build Tool**: Create React App

## Design Patterns

### Backend
- **MVC Pattern**: Separation of concerns
- **Repository Pattern**: Data access abstraction
- **DTO Pattern**: API contract separation
- **Singleton Pattern**: Spring beans
- **Factory Pattern**: Spring bean creation
- **Strategy Pattern**: Authentication strategies

### Frontend
- **Component Pattern**: Reusable UI components
- **Container/Presentational**: Smart and dumb components
- **Higher-Order Components**: Route protection

## Best Practices Implemented

### Backend
✅ Layered architecture
✅ Dependency injection
✅ Global exception handling
✅ Input validation
✅ Logging (SLF4J)
✅ Transaction management
✅ Externalized configuration
✅ RESTful API design
✅ Proper HTTP status codes
✅ Security best practices

### Frontend
✅ Component-based architecture
✅ Responsive design
✅ Error handling
✅ Loading states
✅ Form validation
✅ Clean code structure
✅ Consistent styling
✅ User-friendly UI/UX

## Future Enhancements

### Backend
- [ ] Implement refresh tokens
- [ ] Add pagination for product listing
- [ ] Implement product search and filtering
- [ ] Add unit and integration tests
- [ ] Switch to persistent database (PostgreSQL/MySQL)
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Implement rate limiting
- [ ] Add caching (Redis)
- [ ] Implement audit logging

### Frontend
- [ ] Add state management (Redux/Context API)
- [ ] Implement product search
- [ ] Add product categories
- [ ] Implement image upload for products
- [ ] Add user profile management
- [ ] Implement dark mode
- [ ] Add internationalization (i18n)
- [ ] Improve accessibility (ARIA labels)
- [ ] Add unit tests (Jest/React Testing Library)

## Development Guidelines

### Code Style
- Follow Java naming conventions
- Use meaningful variable names
- Keep methods small and focused
- Write self-documenting code
- Add comments for complex logic

### Git Workflow
- Feature branch workflow
- Meaningful commit messages
- Pull request reviews
- Keep commits atomic

### Testing
- Write unit tests for services
- Integration tests for controllers
- E2E tests for critical flows
- Maintain test coverage above 80%

## Deployment

### Development
```bash
# Backend
cd backend
mvn spring-boot:run

# Frontend
cd frontend
npm start
```

### Production
```bash
# Build backend
cd backend
mvn clean package

# Build frontend
cd frontend
npm run build

# Deploy using Docker
docker-compose up --build
```

## Monitoring and Logging

### Backend Logging
- SLF4J with Logback
- Log levels: DEBUG, INFO, WARN, ERROR
- Structured logging format
- Log rotation configured

### Frontend Logging
- Console logging for development
- Error tracking (can integrate Sentry)
- Performance monitoring

## Support

For issues or questions:
- Check documentation
- Review code comments
- Open GitHub issue
- Contact development team

---

**Last Updated**: November 2025
**Version**: 1.0.0
**Maintainers**: Development Team
