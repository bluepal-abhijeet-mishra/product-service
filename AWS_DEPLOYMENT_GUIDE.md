# ProductHub - AWS EC2 Deployment Guide (MobaXterm)

Complete step-by-step guide to deploy your full-stack application on AWS EC2.

---

## 📋 Prerequisites

### On Your Local Machine
- ✅ MobaXterm installed
- ✅ AWS Account created
- ✅ Project built and tested locally

### What You'll Need
- AWS EC2 instance (t2.medium or larger recommended)
- Security key pair (.pem file)
- Domain name (optional, but recommended)

---

## 🚀 Part 1: AWS EC2 Setup

### Step 1: Launch EC2 Instance

1. **Login to AWS Console**
   - Go to https://aws.amazon.com/console/
   - Navigate to EC2 Dashboard

2. **Launch Instance**
   - Click "Launch Instance"
   - **Name**: `ProductHub-Server`
   - **AMI**: Ubuntu Server 22.04 LTS (Free tier eligible)
   - **Instance Type**: t2.medium (2 vCPU, 4GB RAM)
   - **Key Pair**: Create new or use existing
     - Name: `producthub-key`
     - Type: RSA
     - Format: .pem
     - **Download and save the .pem file securely!**

3. **Configure Network Settings**
   - **VPC**: Default
   - **Auto-assign Public IP**: Enable
   - **Firewall (Security Group)**: Create new
     - Name: `ProductHub-SG`
     - Description: Security group for ProductHub

4. **Add Security Group Rules**
   ```
   Type            Protocol    Port Range    Source
   SSH             TCP         22            My IP (or 0.0.0.0/0)
   HTTP            TCP         80            0.0.0.0/0
   HTTPS           TCP         443           0.0.0.0/0
   Custom TCP      TCP         8080          0.0.0.0/0 (Backend)
   Custom TCP      TCP         3000          0.0.0.0/0 (Frontend - temp)
   ```

5. **Configure Storage**
   - Size: 20 GB (or more)
   - Type: gp3

6. **Launch Instance**
   - Click "Launch Instance"
   - Wait for instance to be in "Running" state
   - Note down the **Public IPv4 address**

---

## 🔐 Part 2: Connect Using MobaXterm

### Step 1: Setup MobaXterm Session

1. **Open MobaXterm**

2. **Create New SSH Session**
   - Click "Session" button (top left)
   - Select "SSH"

3. **Configure Session**
   ```
   Remote host: YOUR_EC2_PUBLIC_IP
   Specify username: ubuntu
   Port: 22
   ```

4. **Advanced SSH Settings**
   - Click "Advanced SSH settings" tab
   - Check "Use private key"
   - Browse and select your `.pem` file
   - Click "OK"

5. **Connect**
   - Double-click the saved session
   - Accept the host key if prompted
   - You should see: `ubuntu@ip-xxx-xxx-xxx-xxx:~$`

### Step 2: Verify Connection
```bash
# Check system info
uname -a
# Should show: Linux ... Ubuntu

# Check internet connectivity
ping -c 3 google.com
```

---

## 🛠️ Part 3: Install Required Software

### Step 1: Update System
```bash
sudo apt update
sudo apt upgrade -y
```

### Step 2: Install Java 17
```bash
# Install Java
sudo apt install openjdk-17-jdk -y

# Verify installation
java -version
# Should show: openjdk version "17.x.x"
```

### Step 3: Install Maven
```bash
# Install Maven
sudo apt install maven -y

# Verify installation
mvn -version
```

### Step 4: Install Node.js and npm
```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v
npm -v
```

### Step 5: Install Nginx (Web Server)
```bash
# Install Nginx
sudo apt install nginx -y

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

### Step 6: Install PostgreSQL (Production Database)
```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Check status
sudo systemctl status postgresql
```

---

## 📦 Part 4: Setup PostgreSQL Database

### Step 1: Create Database and User
```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE DATABASE producthub;
CREATE USER producthub_user WITH ENCRYPTED PASSWORD 'YourStrongPassword123!';
GRANT ALL PRIVILEGES ON DATABASE producthub TO producthub_user;
\q
```

### Step 2: Configure PostgreSQL for Remote Access (if needed)
```bash
# Edit postgresql.conf
sudo nano /etc/postgresql/14/main/postgresql.conf

# Find and change:
listen_addresses = 'localhost'

# Edit pg_hba.conf
sudo nano /etc/postgresql/14/main/pg_hba.conf

# Add this line:
host    producthub    producthub_user    127.0.0.1/32    md5

# Restart PostgreSQL
sudo systemctl restart postgresql
```

---

## 📤 Part 5: Upload Your Project

### Method 1: Using MobaXterm SFTP (Easiest)

1. **In MobaXterm**
   - Left sidebar shows file browser
   - Navigate to `/home/ubuntu/`
   - Create folder: `mkdir producthub`
   - Drag and drop your project folder from Windows to MobaXterm

2. **Or use command line in MobaXterm local terminal:**
```bash
# From your Windows machine (MobaXterm local terminal)
scp -i "path/to/producthub-key.pem" -r C:/path/to/product-service ubuntu@YOUR_EC2_IP:/home/ubuntu/
```

### Method 2: Using Git (Recommended)

```bash
# On EC2 instance
cd /home/ubuntu

# Install git
sudo apt install git -y

# Clone your repository
git clone https://github.com/yourusername/product-service.git
cd product-service
```

---

## 🔧 Part 6: Configure Backend for Production

### Step 1: Update application.properties
```bash
cd /home/ubuntu/product-service/backend/src/main/resources

# Create production properties
nano application-prod.properties
```

**Add this content:**
```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/producthub
spring.datasource.username=producthub_user
spring.datasource.password=YourStrongPassword123!
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update

# JWT Configuration
jwt.secret=CHANGE_THIS_TO_A_VERY_LONG_RANDOM_STRING_AT_LEAST_256_BITS
jwt.expiration=36000000

# Logging
logging.level.root=INFO
logging.level.com.example.productapp=INFO
logging.file.name=/var/log/producthub/application.log

# CORS
cors.allowed-origins=http://YOUR_EC2_PUBLIC_IP,http://YOUR_DOMAIN.com
```

### Step 2: Update pom.xml (Add PostgreSQL)
```bash
nano /home/ubuntu/product-service/backend/pom.xml
```

**Add PostgreSQL dependency:**
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

### Step 3: Update CORS Configuration
```bash
nano /home/ubuntu/product-service/backend/src/main/java/com/example/productapp/config/CorsConfig.java
```

**Update allowed origins:**
```java
configuration.setAllowedOrigins(Arrays.asList(
    "http://YOUR_EC2_PUBLIC_IP",
    "http://YOUR_DOMAIN.com",
    "https://YOUR_DOMAIN.com"
));
```

### Step 4: Build Backend
```bash
cd /home/ubuntu/product-service/backend

# Build the application
mvn clean package -DskipTests

# JAR file will be in target/ directory
ls -lh target/*.jar
```

---

## 🎨 Part 7: Configure Frontend for Production

### Step 1: Update API URL
```bash
cd /home/ubuntu/product-service/frontend

# Create production environment file
nano .env.production
```

**Add this content:**
```
REACT_APP_API_URL=http://YOUR_EC2_PUBLIC_IP:8080
```

### Step 2: Update API URLs in Components

**Create a config file:**
```bash
nano src/config.js
```

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://YOUR_EC2_PUBLIC_IP:8080';
export default API_BASE_URL;
```

**Update components to use config:**
```bash
# You'll need to update Login.js, Register.js, ProductList.js, ProductForm.js
# Replace 'http://localhost:8080' with API_BASE_URL
```

### Step 3: Build Frontend
```bash
cd /home/ubuntu/product-service/frontend

# Install dependencies
npm install

# Build for production
npm run build

# Build folder will be created
ls -lh build/
```

---

## 🚀 Part 8: Deploy Backend as Service

### Step 1: Create Systemd Service
```bash
sudo nano /etc/systemd/system/producthub-backend.service
```

**Add this content:**
```ini
[Unit]
Description=ProductHub Backend Service
After=syslog.target network.target postgresql.service

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/product-service/backend
ExecStart=/usr/bin/java -jar -Dspring.profiles.active=prod /home/ubuntu/product-service/backend/target/product-app-0.0.1-SNAPSHOT.jar
SuccessExitStatus=143
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### Step 2: Start Backend Service
```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable service (start on boot)
sudo systemctl enable producthub-backend

# Start service
sudo systemctl start producthub-backend

# Check status
sudo systemctl status producthub-backend

# View logs
sudo journalctl -u producthub-backend -f
```

### Step 3: Verify Backend is Running
```bash
# Test backend
curl http://localhost:8080/actuator/health

# Should return: {"status":"UP"}
```

---

## 🌐 Part 9: Deploy Frontend with Nginx

### Step 1: Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/producthub
```

**Add this content:**
```nginx
server {
    listen 80;
    server_name YOUR_EC2_PUBLIC_IP YOUR_DOMAIN.com;

    # Frontend
    location / {
        root /home/ubuntu/product-service/frontend/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API Proxy
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 2: Enable Site
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/producthub /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 3: Set Permissions
```bash
# Give Nginx access to frontend build
sudo chmod -R 755 /home/ubuntu/product-service/frontend/build
```

---

## 🔒 Part 10: Setup SSL (Optional but Recommended)

### Step 1: Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Step 2: Get SSL Certificate
```bash
# Make sure your domain points to your EC2 IP first!
sudo certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com

# Follow the prompts
# Choose option 2 to redirect HTTP to HTTPS
```

### Step 3: Auto-renewal
```bash
# Test renewal
sudo certbot renew --dry-run

# Certbot will auto-renew via cron
```

---

## ✅ Part 11: Verification

### Step 1: Check All Services
```bash
# Backend
sudo systemctl status producthub-backend

# Nginx
sudo systemctl status nginx

# PostgreSQL
sudo systemctl status postgresql
```

### Step 2: Test Application
```bash
# Test backend
curl http://YOUR_EC2_PUBLIC_IP:8080/actuator/health

# Test frontend
curl http://YOUR_EC2_PUBLIC_IP
```

### Step 3: Access from Browser
1. Open browser
2. Go to `http://YOUR_EC2_PUBLIC_IP`
3. You should see the landing page
4. Register a new user
5. Login
6. Create products

---

## 📊 Part 12: Monitoring and Logs

### View Backend Logs
```bash
# Real-time logs
sudo journalctl -u producthub-backend -f

# Last 100 lines
sudo journalctl -u producthub-backend -n 100

# Logs from today
sudo journalctl -u producthub-backend --since today
```

### View Nginx Logs
```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

### View PostgreSQL Logs
```bash
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

---

## 🔄 Part 13: Update Deployment

### Update Backend
```bash
# Stop service
sudo systemctl stop producthub-backend

# Pull latest code (if using git)
cd /home/ubuntu/product-service
git pull

# Rebuild
cd backend
mvn clean package -DskipTests

# Start service
sudo systemctl start producthub-backend
```

### Update Frontend
```bash
# Pull latest code
cd /home/ubuntu/product-service
git pull

# Rebuild
cd frontend
npm run build

# Reload Nginx
sudo systemctl reload nginx
```

---

## 🛡️ Part 14: Security Best Practices

### 1. Firewall Setup
```bash
# Install UFW
sudo apt install ufw -y

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow backend (only if needed externally)
sudo ufw allow 8080/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

### 2. Secure PostgreSQL
```bash
# Change postgres password
sudo -u postgres psql
ALTER USER postgres WITH PASSWORD 'VeryStrongPassword123!';
\q
```

### 3. Regular Updates
```bash
# Create update script
nano ~/update-system.sh
```

```bash
#!/bin/bash
sudo apt update
sudo apt upgrade -y
sudo apt autoremove -y
```

```bash
chmod +x ~/update-system.sh
```

---

## 🚨 Troubleshooting

### Backend Won't Start
```bash
# Check logs
sudo journalctl -u producthub-backend -n 50

# Check if port is in use
sudo netstat -tulpn | grep 8080

# Check Java process
ps aux | grep java
```

### Frontend Not Loading
```bash
# Check Nginx
sudo nginx -t
sudo systemctl status nginx

# Check permissions
ls -la /home/ubuntu/product-service/frontend/build

# Check Nginx error log
sudo tail -f /var/log/nginx/error.log
```

### Database Connection Issues
```bash
# Check PostgreSQL
sudo systemctl status postgresql

# Test connection
psql -h localhost -U producthub_user -d producthub

# Check logs
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

---

## 📝 Quick Reference Commands

```bash
# Restart all services
sudo systemctl restart producthub-backend
sudo systemctl restart nginx
sudo systemctl restart postgresql

# View all logs
sudo journalctl -u producthub-backend -f
sudo tail -f /var/log/nginx/error.log

# Check disk space
df -h

# Check memory
free -h

# Check processes
htop
```

---

## 🎉 Success Checklist

- [ ] EC2 instance running
- [ ] Connected via MobaXterm
- [ ] All software installed
- [ ] PostgreSQL configured
- [ ] Backend built and running
- [ ] Frontend built and deployed
- [ ] Nginx configured
- [ ] Application accessible from browser
- [ ] Can register users
- [ ] Can login
- [ ] Can manage products
- [ ] SSL configured (optional)
- [ ] Monitoring setup

---

## 📞 Support

If you encounter issues:
1. Check the logs
2. Verify all services are running
3. Check security group rules
4. Verify database connection
5. Check CORS configuration

---

**Congratulations! Your ProductHub is now live on AWS! 🚀**

Access your application at: `http://YOUR_EC2_PUBLIC_IP`
