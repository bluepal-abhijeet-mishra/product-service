# ProductHub - Production Deployment Checklist

## 🚀 Pre-Deployment Checklist

### Security
- [ ] Change JWT secret key in `application.properties`
- [ ] Use strong, randomly generated secret (minimum 256 bits)
- [ ] Enable HTTPS/SSL certificates
- [ ] Update CORS configuration for production domain
- [ ] Review and update password policies
- [ ] Enable rate limiting on API endpoints
- [ ] Implement request throttling
- [ ] Add security headers (HSTS, CSP, X-Frame-Options)

### Database
- [ ] Switch from H2 to production database (PostgreSQL/MySQL)
- [ ] Set up database connection pooling
- [ ] Configure database backups
- [ ] Set up database monitoring
- [ ] Create database indexes for performance
- [ ] Implement database migration strategy
- [ ] Set up read replicas (if needed)

### Backend Configuration
- [ ] Update `application.properties` for production
- [ ] Set appropriate log levels (INFO or WARN)
- [ ] Configure external logging (ELK, Splunk, etc.)
- [ ] Set up health check endpoints
- [ ] Configure actuator endpoints
- [ ] Enable production profiles
- [ ] Set up environment variables
- [ ] Configure connection timeouts
- [ ] Set up thread pool sizes

### Frontend Configuration
- [ ] Update API base URL to production backend
- [ ] Build production bundle: `npm run build`
- [ ] Optimize images and assets
- [ ] Enable gzip compression
- [ ] Configure CDN for static assets
- [ ] Set up error tracking (Sentry, Rollbar)
- [ ] Configure analytics (Google Analytics, etc.)
- [ ] Optimize bundle size
- [ ] Enable service workers (if needed)

### Infrastructure
- [ ] Set up load balancer
- [ ] Configure auto-scaling
- [ ] Set up monitoring (Prometheus, Grafana)
- [ ] Configure alerting
- [ ] Set up log aggregation
- [ ] Configure backup strategy
- [ ] Set up disaster recovery plan
- [ ] Configure firewall rules
- [ ] Set up VPC/network security

### Testing
- [ ] Run all unit tests
- [ ] Run integration tests
- [ ] Perform load testing
- [ ] Conduct security testing
- [ ] Test backup and restore procedures
- [ ] Verify monitoring and alerting
- [ ] Test failover scenarios
- [ ] Perform user acceptance testing

### Documentation
- [ ] Update API documentation
- [ ] Create deployment guide
- [ ] Document environment variables
- [ ] Create runbook for common issues
- [ ] Document backup procedures
- [ ] Create incident response plan
- [ ] Update architecture diagrams

### Performance
- [ ] Enable caching (Redis, Memcached)
- [ ] Optimize database queries
- [ ] Implement pagination for large datasets
- [ ] Enable HTTP/2
- [ ] Optimize frontend bundle size
- [ ] Implement lazy loading
- [ ] Set up CDN for static assets
- [ ] Configure browser caching

---

## 📋 Production Configuration Examples

### Backend - application-prod.properties
```properties
# Server Configuration
server.port=8080
server.compression.enabled=true
server.http2.enabled=true

# Database Configuration (PostgreSQL Example)
spring.datasource.url=jdbc:postgresql://your-db-host:5432/producthub
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=validate

# Connection Pool
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000

# JWT Configuration
jwt.secret=${JWT_SECRET}
jwt.expiration=3600000

# Logging
logging.level.root=INFO
logging.level.com.example.productapp=INFO
logging.file.name=/var/log/producthub/application.log
logging.pattern.file=%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n

# Actuator
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=when-authorized

# CORS
cors.allowed-origins=${FRONTEND_URL}
```

### Frontend - Environment Variables
```bash
# .env.production
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ENV=production
```

### Docker Compose - Production
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: producthub
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

  backend:
    build: ./backend
    environment:
      SPRING_PROFILES_ACTIVE: prod
      DB_USERNAME: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - postgres
    restart: always

  frontend:
    build: ./frontend
    environment:
      REACT_APP_API_URL: ${API_URL}
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - backend
      - frontend
    restart: always

volumes:
  postgres_data:
```

---

## 🔒 Security Hardening

### JWT Secret Generation
```bash
# Generate a secure random secret
openssl rand -base64 64
```

### Environment Variables
Never commit these to version control:
```bash
# .env (add to .gitignore)
DB_USERNAME=your_db_user
DB_PASSWORD=your_secure_password
JWT_SECRET=your_generated_secret
FRONTEND_URL=https://yourdomain.com
```

### HTTPS Configuration
- Obtain SSL certificate (Let's Encrypt, etc.)
- Configure reverse proxy (Nginx, Apache)
- Redirect HTTP to HTTPS
- Enable HSTS headers

---

## 📊 Monitoring Setup

### Health Check Endpoints
```bash
# Backend health
GET /actuator/health

# Custom health checks
GET /api/health
```

### Metrics to Monitor
- [ ] CPU usage
- [ ] Memory usage
- [ ] Disk space
- [ ] Database connections
- [ ] API response times
- [ ] Error rates
- [ ] Active users
- [ ] Request throughput

### Alerting Rules
- [ ] High error rate (> 5%)
- [ ] Slow response time (> 2s)
- [ ] High CPU usage (> 80%)
- [ ] High memory usage (> 85%)
- [ ] Database connection pool exhaustion
- [ ] Disk space low (< 10%)

---

## 🚀 Deployment Steps

### 1. Build Backend
```bash
cd backend
mvn clean package -DskipTests
```

### 2. Build Frontend
```bash
cd frontend
npm run build
```

### 3. Deploy to Server
```bash
# Copy JAR file
scp backend/target/product-app-0.0.1-SNAPSHOT.jar user@server:/opt/producthub/

# Copy frontend build
scp -r frontend/build/* user@server:/var/www/producthub/
```

### 4. Start Services
```bash
# Start backend
java -jar -Dspring.profiles.active=prod product-app-0.0.1-SNAPSHOT.jar

# Or use systemd service
sudo systemctl start producthub-backend
sudo systemctl start producthub-frontend
```

### 5. Verify Deployment
```bash
# Check backend health
curl https://api.yourdomain.com/actuator/health

# Check frontend
curl https://yourdomain.com
```

---

## 🔄 Rollback Plan

### If Deployment Fails
1. Stop new version
2. Start previous version
3. Verify application is working
4. Investigate issues
5. Fix and redeploy

### Backup Strategy
- [ ] Database backups (daily)
- [ ] Application backups (before each deployment)
- [ ] Configuration backups
- [ ] Log backups

---

## ✅ Post-Deployment Verification

- [ ] Application is accessible
- [ ] Users can register
- [ ] Users can login
- [ ] Products can be created
- [ ] Products can be edited
- [ ] Products can be deleted
- [ ] No errors in logs
- [ ] Monitoring is working
- [ ] Alerts are configured
- [ ] Backups are running
- [ ] SSL certificate is valid
- [ ] Performance is acceptable

---

## 📞 Support Contacts

**Development Team**: dev@yourdomain.com
**Operations Team**: ops@yourdomain.com
**Emergency Contact**: +1-XXX-XXX-XXXX

---

## 📝 Deployment Log Template

**Deployment Date**: _______________
**Deployed By**: _______________
**Version**: _______________
**Environment**: Production
**Status**: ⬜ Success ⬜ Failed ⬜ Rolled Back

**Changes**:
- 
- 
- 

**Issues Encountered**:
- 
- 

**Resolution**:
- 
- 

**Verification**:
- [ ] All tests passed
- [ ] Monitoring confirmed
- [ ] No errors in logs

---

**Remember**: Always test in staging before deploying to production!
