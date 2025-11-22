# Solar Leads - Backend API

Backend API for the Solar Leads System built with Node.js, Express, TypeScript, and Prisma.

## 🛠️ Technologies

- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
nano .env

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Seed database with test data
npm run prisma:seed
```

## 🚀 Development

```bash
# Start development server with hot reload
npm run dev

# Server will start on http://localhost:3000
# Health check: http://localhost:3000/health
```

## 🏗️ Build

```bash
# Build TypeScript to JavaScript
npm run build

# Start production server
npm start
```

## 🗃️ Database

### Migrations

```bash
# Create a new migration
npm run prisma:migrate

# Deploy migrations to production
npm run prisma:deploy

# Open Prisma Studio (database GUI)
npm run prisma:studio
```

### Seed Data

```bash
# Seed database with test data
npm run prisma:seed
```

**Test credentials after seeding:**
- Email: `teste@solarlead.com`
- Password: `senha123`
- Subdomain: `teste`

## 📡 API Endpoints

### Public Endpoints

#### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh access token

#### Lead Capture
- `POST /api/lead` - Create new lead (from landing page)

#### Webhooks
- `POST /api/webhooks/waha` - WAHA webhook handler

### Protected Endpoints (Require JWT)

#### Leads
- `GET /api/leads` - List leads (with pagination & filters)
- `GET /api/leads/:id` - Get lead details
- `GET /api/leads/export` - Export leads to CSV
- `PATCH /api/leads/:id/status` - Update lead status
- `PATCH /api/leads/:id/notes` - Update lead notes

#### Metrics
- `GET /api/metrics` - Get all metrics
- `GET /api/metrics/overview` - Get overview metrics (cards)
- `GET /api/metrics/chart` - Get chart data

#### Cliente Configuration
- `GET /api/clientes/:id` - Get cliente data
- `PATCH /api/clientes/:id` - Update cliente
- `POST /api/clientes/:id/logo` - Upload logo (TODO)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Login Example

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@solarlead.com",
    "password": "senha123"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "user": {
      "id": "clh...",
      "nome": "Solar Energy Integrador Teste",
      "email": "teste@solarlead.com",
      "subdominio": "teste"
    }
  }
}
```

### Using the Token

Include the access token in the `Authorization` header:

```bash
curl -X GET http://localhost:3000/api/leads \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🐳 Docker

```bash
# Build image
docker build -t solar-leads-backend .

# Run container
docker run -p 3000:3000 --env-file .env solar-leads-backend
```

## 🧪 Testing

```bash
# Run tests (TODO)
npm test
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── database/         # Database configuration
│   ├── middlewares/      # Express middlewares
│   ├── routes/           # API routes
│   ├── services/         # Business logic (TODO)
│   ├── flows/            # WhatsApp bot flows (TODO)
│   └── server.ts         # Main server file
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── seed.ts           # Seed script
│   └── migrations/       # Database migrations
├── Dockerfile
├── tsconfig.json
└── package.json
```

## 🔒 Security

- **Helmet**: Sets security HTTP headers
- **CORS**: Configured for specific origins
- **Rate Limiting**: Protects against brute force
- **JWT**: Secure token-based authentication
- **bcrypt**: Password hashing (10 rounds)
- **Zod**: Input validation
- **Prisma**: SQL injection protection

## 🌍 Environment Variables

See `.env.example` for all available environment variables.

**Required:**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for signing access tokens
- `JWT_REFRESH_SECRET` - Secret for signing refresh tokens

**Optional:**
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Allowed CORS origins

## 📝 TODO

- [ ] Implement WhatsApp bot flows (WAHA integration)
- [ ] Add file upload functionality (logo)
- [ ] Add email notifications
- [ ] Add automated tests
- [ ] Add logging service (Winston)
- [ ] Add error tracking (Sentry)
- [ ] Implement services layer
- [ ] Add API documentation (Swagger)

## 🐛 Troubleshooting

### Database connection error
- Check if PostgreSQL is running
- Verify `DATABASE_URL` in `.env`
- Ensure database exists: `createdb solar_leads`

### Migration failed
- Reset database: `npx prisma migrate reset`
- Then run: `npm run prisma:migrate`

### JWT errors
- Verify `JWT_SECRET` and `JWT_REFRESH_SECRET` are set
- Tokens expire after 24h (access) and 7d (refresh)

## 📄 License

Proprietary - All rights reserved
