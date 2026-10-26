<<<<<<< HEAD
# vasavi-portfolio
=======
# Vasavi Portfolio Backend

A production-quality REST API backend for the personal portfolio of **Vasavi Guptha Vanaparthy**.

Built with **Node.js**, **Express.js**, **TypeScript**, **PostgreSQL**, and **Prisma ORM**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 20 LTS |
| Framework | Express.js 4 |
| Language | TypeScript 5 (strict) |
| ORM | Prisma 5 |
| Database | PostgreSQL 15+ |
| Security | Helmet, CORS, Rate Limiting |
| Validation | express-validator |
| Testing | Jest + Supertest |

---

## Architecture

```
Request → Router → Controller → Service → Prisma → PostgreSQL
```

```
src/
├── config/         # Env loader, Prisma singleton
├── controllers/    # HTTP req/res handling (thin layer)
├── services/       # Business logic + DB queries
├── routes/         # URL mapping, middleware chaining
├── middleware/     # Error handler, 404, rate limiter, validator
├── types/          # Shared TypeScript interfaces
├── utils/          # apiResponse helpers, logger
├── app.ts          # Express app setup
└── server.ts       # HTTP server + graceful shutdown

prisma/
├── schema.prisma   # Database models
└── seed.ts         # Seed script with resume data

tests/              # Jest + Supertest test suite
```

### Layered Responsibilities

| Layer | Responsibility |
|---|---|
| **Route** | URL mapping, middleware pipeline |
| **Controller** | Parse req, call service, send res |
| **Service** | Business logic, DB calls via Prisma |
| **Prisma** | Type-safe database queries |

---

## Database Models

| Model | Purpose |
|---|---|
| `Profile` | Portfolio owner's personal info |
| `Skill` | Technical skills with categories |
| `Experience` | Work experience |
| `Project` | Portfolio projects |
| `Education` | Academic background |
| `Achievement` | Notable achievements |
| `ContactMessage` | Visitor contact form submissions |

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+ running locally

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd vasavi-portfolio-backend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and set your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/vasavi_portfolio?schema=public"
PORT=3000
CORS_ORIGIN=http://localhost:4200,http://localhost:3000
```

### 3. Set Up Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (creates tables)
npx prisma migrate dev --name init

# Seed with resume data
npm run seed
```

### 4. Start the Server

```bash
# Development (hot reload)
npm run dev

# Production
npm run build
npm start
```

Server will be available at `http://localhost:3000`.

---

## Prisma Commands

```bash
npx prisma generate          # Regenerate Prisma client after schema changes
npx prisma migrate dev       # Create and apply a new migration
npx prisma migrate deploy    # Apply migrations in production
npx prisma studio            # Open Prisma Studio GUI
npm run seed                 # Seed the database
```

---

## API Endpoints

Base URL: `http://localhost:3000/api`

### Health

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Server health check |

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2025-06-01T10:00:00.000Z",
    "service": "vasavi-portfolio-backend",
    "version": "1.0.0"
  }
}
```

---

### Profile

| Method | Endpoint | Description |
|---|---|---|
| GET | `/profile` | Get portfolio owner's profile |

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clxxxxxxxxxxxxxxx",
    "name": "Vasavi Guptha Vanaparthy",
    "headline": "Computer Science Undergraduate | Backend Developer",
    "summary": "...",
    "email": "vasavivanaparthy03@gmail.com",
    "phone": "+91-6302851862",
    "location": "Hyderabad, Telangana",
    "profileImage": null,
    "resumeUrl": null,
    "linkedinUrl": "https://www.linkedin.com/in/vasavi-vanaparthy",
    "githubUrl": "https://github.com/VASAVIGUPTHA777"
  }
}
```

---

### Skills

| Method | Endpoint | Description |
|---|---|---|
| GET | `/skills` | Get all skills |
| GET | `/skills?category=LANGUAGES` | Filter by category |
| GET | `/skills?grouped=true` | Get skills grouped by category |

**Categories:** `LANGUAGES`, `FRAMEWORKS_AND_WEB`, `DATABASES`, `CORE_CS`, `TOOLS`, `CONCEPTS`

**Response (flat):**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxx",
      "name": "TypeScript",
      "category": "LANGUAGES",
      "proficiency": "ADVANCED",
      "displayOrder": 4
    }
  ]
}
```

**Response (?grouped=true):**
```json
{
  "success": true,
  "data": {
    "LANGUAGES": [...],
    "DATABASES": [...],
    "TOOLS": [...]
  }
}
```

---

### Experience

| Method | Endpoint | Description |
|---|---|---|
| GET | `/experience` | Get all work experience |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxx",
      "company": "ByteSimplified",
      "position": "Software Engineer Intern",
      "startDate": "2025-06-01T00:00:00.000Z",
      "endDate": null,
      "currentlyWorking": true,
      "description": "...",
      "technologies": ["Node.js", "Express.js", "REST APIs", "Git"],
      "displayOrder": 1
    }
  ]
}
```

---

### Projects

| Method | Endpoint | Description |
|---|---|---|
| GET | `/projects` | Get all projects |
| GET | `/projects/:id` | Get single project by ID |

**Response (list):**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxx",
      "title": "Global Partner Gateway",
      "description": "...",
      "technologies": ["Node.js", "Express.js", "PostgreSQL", "Prisma ORM"],
      "githubUrl": null,
      "liveUrl": null,
      "imageUrl": null,
      "displayOrder": 1
    }
  ]
}
```

**404 Response:**
```json
{
  "success": false,
  "message": "Project with ID 'abc' not found."
}
```

---

### Education

| Method | Endpoint | Description |
|---|---|---|
| GET | `/education` | Get all education entries |

---

### Achievements

| Method | Endpoint | Description |
|---|---|---|
| GET | `/achievements` | Get all achievements |

---

### Portfolio (Aggregated)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/portfolio` | All sections in one call |

All sections are fetched in parallel using `Promise.all`. Use this endpoint to load the entire portfolio efficiently from the frontend.

---

### Contact

| Method | Endpoint | Description |
|---|---|---|
| POST | `/contact` | Submit a contact message |

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Collaboration",
  "message": "Hi Vasavi! I'd love to discuss a project opportunity with you."
}
```

**Validation rules:**
- `name`: Required, 2–100 characters
- `email`: Required, valid email format
- `subject`: Required, 3–150 characters
- `message`: Required, 10–2000 characters

**Success response (201):**
```json
{
  "success": true,
  "data": {
    "id": "clxxx",
    "message": "Your message has been received. Thank you for reaching out!",
    "submittedAt": "2025-06-01T10:00:00.000Z"
  }
}
```

**Validation error (422):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["Please provide a valid email address."]
}
```

**Rate limit:** 5 submissions per IP per hour.

---

## Response Format

All API responses follow this consistent structure:

```json
// Success
{ "success": true, "data": { ... } }

// Error
{ "success": false, "message": "...", "errors": ["..."] }
```

**HTTP Status Codes Used:**
| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created (contact form) |
| 404 | Resource not found |
| 422 | Validation failed |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

---

## Security

| Measure | Implementation |
|---|---|
| HTTP security headers | `helmet` |
| CORS whitelist | `cors` with origin whitelist |
| Request body size limit | 10kb max |
| Rate limiting (general) | 100 req / 15 min per IP |
| Rate limiting (contact) | 5 req / hour per IP |
| Input validation | `express-validator` |
| No secrets in responses | Env vars never exposed via API |
| Input sanitization | Trimming + email normalization |

---

## Testing

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage
```

Tests cover: health, profile, skills (filter + grouped), projects (list + by ID + 404), education, experience, contact validation (7 scenarios), 404 routes.

---

## Testing with Postman

Import these requests into Postman:

1. `GET http://localhost:3000/api/health`
2. `GET http://localhost:3000/api/profile`
3. `GET http://localhost:3000/api/skills`
4. `GET http://localhost:3000/api/skills?grouped=true`
5. `GET http://localhost:3000/api/skills?category=LANGUAGES`
6. `GET http://localhost:3000/api/experience`
7. `GET http://localhost:3000/api/projects`
8. `GET http://localhost:3000/api/projects/:id`
9. `GET http://localhost:3000/api/education`
10. `GET http://localhost:3000/api/achievements`
11. `GET http://localhost:3000/api/portfolio`
12. `POST http://localhost:3000/api/contact` (with JSON body)

---

## Future Enhancements (Phase 2)

- Frontend: Angular or React consuming these APIs
- Admin panel: Add authentication later without touching business logic
- Email notifications: Send email when contact form is submitted
- File upload: Profile image and resume PDF upload
- Deployment: Docker + Railway/Render/Fly.io

---

## Author

**Vasavi Guptha Vanaparthy**
- Email: vasavivanaparthy03@gmail.com
- LinkedIn: [vasavi-vanaparthy](https://www.linkedin.com/in/vasavi-vanaparthy)
- GitHub: [VASAVIGUPTHA777](https://github.com/VASAVIGUPTHA777)
>>>>>>> a796de0 (Initial portfolio website commit)
CI/CD pipeline verification test — October 2026
