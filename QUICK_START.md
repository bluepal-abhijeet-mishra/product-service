# ProductHub - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Java 17+
- Node.js 16+
- Maven 3.6+

### Step 1: Start Backend (2 minutes)
```bash
cd backend
mvn spring-boot:run
```
✅ Backend running on http://localhost:8080

### Step 2: Start Frontend (2 minutes)
```bash
cd frontend
npm install
npm start
```
✅ Frontend running on http://localhost:3000

### Step 3: Use the Application (1 minute)

1. **Open Browser**: http://localhost:3000
2. **Register**: Click "Get Started" → Create account
3. **Login**: Sign in with your credentials
4. **Manage Products**: Create, edit, delete products

## 🎯 Key Features

### For All Users
✅ Create products
✅ Edit products
✅ Delete products
✅ View all products
✅ Secure authentication

### No Role Restrictions
- All authenticated users have full access
- No admin vs user distinction
- Simple and straightforward

## 📝 API Quick Reference

### Authentication
```bash
# Register
POST http://localhost:8080/api/auth/register
Body: {"username": "john", "password": "password123"}

# Login
POST http://localhost:8080/api/auth/login
Body: {"username": "john", "password": "password123"}
Response: {"token": "...", "username": "john", "message": "Login successful"}
```

### Products (Requires Authentication)
```bash
# Get all products
GET http://localhost:8080/api/products
Header: Authorization: Bearer YOUR_TOKEN

# Create product
POST http://localhost:8080/api/products
Header: Authorization: Bearer YOUR_TOKEN
Body: {"name": "Product 1", "description": "Description", "price": 99.99}

# Update product
PUT http://localhost:8080/api/products/1
Header: Authorization: Bearer YOUR_TOKEN
Body: {"name": "Updated", "description": "Updated desc", "price": 149.99}

# Delete product
DELETE http://localhost:8080/api/products/1
Header: Authorization: Bearer YOUR_TOKEN
```

## 🔧 Common Issues

### Backend won't start
- Check if port 8080 is available
- Verify Java 17+ is installed: `java -version`
- Clean and rebuild: `mvn clean install`

### Frontend won't start
- Check if port 3000 is available
- Delete node_modules and reinstall: `npm install`
- Clear npm cache: `npm cache clean --force`

### Can't login
- Ensure backend is running
- Check browser console for errors
- Verify credentials are correct

### Products not loading
- Check JWT token in localStorage
- Verify backend is running
- Check browser network tab for API errors

## 📊 Database Access

**H2 Console**: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: `password`

## 🎨 Customization

### Change Colors
Edit `frontend/src/App.css` and `frontend/src/index.css`

### Change Port
**Backend**: Edit `backend/src/main/resources/application.properties`
```properties
server.port=8080
```

**Frontend**: Set environment variable
```bash
set PORT=3001
npm start
```

### Change JWT Expiration
Edit `backend/src/main/resources/application.properties`
```properties
jwt.expiration=36000000  # 10 hours in milliseconds
```

## 📚 More Information

- **Full Documentation**: See README.md
- **Architecture Details**: See ARCHITECTURE.md
- **Setup Guide**: See SETUP_GUIDE.md
- **Recent Changes**: See CHANGELOG.md

## ✅ Success Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access landing page
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Can create product
- [ ] Can view products
- [ ] Can edit product
- [ ] Can delete product

## 🆘 Need Help?

1. Check the error message
2. Review the logs (backend console)
3. Check browser console (frontend)
4. Verify all prerequisites are installed
5. Ensure ports 3000 and 8080 are available

## 🎉 You're Ready!

Your ProductHub application is now running. Start managing your products!

---

**Pro Tip**: Keep both terminal windows open to see real-time logs from backend and frontend.
