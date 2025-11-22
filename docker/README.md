# Docker Setup - Solar Leads

Docker Compose configuration for deploying the Solar Leads system.

## 🐳 Services

- **postgres** - PostgreSQL 15 database
- **backend** - Node.js API (Express + TypeScript + Prisma)
- **waha** - WhatsApp HTTP API
- **dashboard** - Next.js admin dashboard
- **traefik** - Reverse proxy with automatic SSL (Let's Encrypt)

## 🚀 Quick Start

### 1. Setup Environment

```bash
cd docker
cp .env.example .env
nano .env
```

**Required configurations:**
- `DOMAIN` - Your domain (e.g., seudominio.com)
- `LETSENCRYPT_EMAIL` - Email for SSL certificates
- `POSTGRES_PASSWORD` - Secure database password
- `JWT_SECRET` - Random 32+ character string
- `JWT_REFRESH_SECRET` - Random 32+ character string

**Generate secure secrets:**
```bash
# Generate JWT secrets
openssl rand -base64 32
openssl rand -base64 32
```

### 2. DNS Configuration

Point these subdomains to your server IP:

```
api.seudominio.com      → Your VPS IP
dashboard.seudominio.com → Your VPS IP
waha.seudominio.com     → Your VPS IP
traefik.seudominio.com  → Your VPS IP
```

Or use wildcard DNS:
```
*.seudominio.com → Your VPS IP
```

### 3. Start Services

```bash
# Build and start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### 4. Database Migration

```bash
# Run Prisma migrations
docker exec solar-leads-backend npx prisma migrate deploy

# Seed database (optional - creates test data)
docker exec solar-leads-backend npm run prisma:seed
```

### 5. Verify Deployment

Check health endpoints:
- API: https://api.seudominio.com/health
- Dashboard: https://dashboard.seudominio.com
- WAHA: https://waha.seudominio.com/health
- Traefik: https://traefik.seudominio.com (username: admin)

## 📋 Commands

### Service Management

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Restart specific service
docker-compose restart backend

# View logs
docker-compose logs -f backend
docker-compose logs --tail=100 postgres

# Check status
docker-compose ps
```

### Database

```bash
# Access PostgreSQL
docker exec -it solar-leads-postgres psql -U postgres -d solar_leads

# Backup database
docker exec solar-leads-postgres pg_dump -U postgres solar_leads | gzip > backup_$(date +%Y%m%d).sql.gz

# Restore database
gunzip -c backup_20231122.sql.gz | docker exec -i solar-leads-postgres psql -U postgres solar_leads

# Run migrations
docker exec solar-leads-backend npx prisma migrate deploy

# Prisma Studio (database GUI)
docker exec -it solar-leads-backend npx prisma studio
```

### Debugging

```bash
# Shell into backend container
docker exec -it solar-leads-backend sh

# Check environment variables
docker exec solar-leads-backend env

# Test database connection
docker exec solar-leads-backend npx prisma db pull

# View all networks
docker network ls

# Inspect network
docker network inspect solar-leads_solar-leads-network
```

## 🔄 Updates & Deployment

### Update Backend Code

```bash
cd solar-leads
git pull origin main

cd docker
docker-compose build backend
docker-compose up -d backend

# Run any new migrations
docker exec solar-leads-backend npx prisma migrate deploy
```

### Update Dashboard

```bash
cd docker
docker-compose build dashboard
docker-compose up -d dashboard
```

### Update All Services

```bash
cd docker
docker-compose build
docker-compose up -d
```

## 📊 Monitoring

### Container Health

```bash
# Check container status
docker-compose ps

# Check resource usage
docker stats

# View health checks
docker inspect solar-leads-backend | grep -A 10 Health
```

### Logs

```bash
# Follow all logs
docker-compose logs -f

# Backend only
docker-compose logs -f backend

# Last 100 lines
docker-compose logs --tail=100 backend

# Save logs to file
docker-compose logs > logs_$(date +%Y%m%d).txt
```

## 🔒 Security

### Firewall (UFW)

```bash
# Allow only necessary ports
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### SSL Certificates

Traefik automatically obtains and renews SSL certificates from Let's Encrypt.

Certificates are stored in: `traefik_letsencrypt` volume

### Secrets

Never commit `.env` file to Git!

Rotate secrets regularly:
```bash
# Generate new JWT secrets
openssl rand -base64 32

# Update .env
nano .env

# Restart backend
docker-compose restart backend
```

## 🗄️ Backup Strategy

### Automated Daily Backup

Create `/root/backup-solar-leads.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/root/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
docker exec solar-leads-postgres pg_dump -U postgres solar_leads | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Backup volumes
docker run --rm -v solar-leads_postgres_data:/data -v $BACKUP_DIR:/backup alpine tar czf /backup/postgres_data_$DATE.tar.gz -C /data .
docker run --rm -v solar-leads_waha_data:/data -v $BACKUP_DIR:/backup alpine tar czf /backup/waha_data_$DATE.tar.gz -C /data .

# Delete backups older than 30 days
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete

echo "Backup completed: $DATE"
```

Make it executable and add to crontab:

```bash
chmod +x /root/backup-solar-leads.sh

# Run daily at 3 AM
crontab -e
# Add: 0 3 * * * /root/backup-solar-leads.sh >> /var/log/backup-solar-leads.log 2>&1
```

## 🔧 Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs backend

# Remove and recreate
docker-compose down
docker-compose up -d
```

### Database connection error

```bash
# Check if PostgreSQL is ready
docker exec solar-leads-postgres pg_isready

# Check DATABASE_URL
docker exec solar-leads-backend env | grep DATABASE_URL

# Verify network connectivity
docker exec solar-leads-backend ping postgres
```

### SSL certificate error

```bash
# Check Traefik logs
docker-compose logs traefik

# Verify DNS is pointing to server
dig api.seudominio.com

# Force certificate renewal (if needed)
docker-compose down traefik
docker volume rm solar-leads_traefik_letsencrypt
docker-compose up -d traefik
```

### WAHA not connecting

```bash
# Check WAHA status
docker-compose logs waha

# Restart WAHA
docker-compose restart waha

# Check webhook configuration
docker exec solar-leads-waha env | grep WHATSAPP_HOOK
```

## 📈 Scaling

### Vertical Scaling (Upgrade VPS)

1. Stop services: `docker-compose down`
2. Backup everything
3. Upgrade VPS resources
4. Start services: `docker-compose up -d`

### Horizontal Scaling (Docker Swarm)

Convert to Docker Swarm for multi-node deployment:

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml solar-leads

# Scale services
docker service scale solar-leads_backend=3
```

## 🆘 Emergency Recovery

### Complete System Restore

```bash
# 1. Stop all services
docker-compose down -v

# 2. Restore database backup
gunzip -c /root/backups/db_20231122.sql.gz | docker exec -i solar-leads-postgres psql -U postgres solar_leads

# 3. Restore volumes
docker run --rm -v solar-leads_postgres_data:/data -v /root/backups:/backup alpine tar xzf /backup/postgres_data_20231122.tar.gz -C /data

# 4. Start services
docker-compose up -d

# 5. Verify
curl https://api.seudominio.com/health
```

## 📞 Support

For issues with:
- **Docker**: Check Docker logs first
- **Database**: Verify connection and migrations
- **SSL**: Ensure DNS is correct and ports are open
- **WAHA**: Check WhatsApp connection and webhook

---

**Last updated**: 2024-11-22
