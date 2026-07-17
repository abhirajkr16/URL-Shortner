#  URL Shortener

 URL Shortener is a backend REST API designed to generate, resolve, and manage shortened URLs. It provides users with secure accounts to create custom aliases, define link expirations, track redirection counts, and inspect click-by-click analytics.

The primary goal of this project is to build a high-performance, containerized link shortening service with a strong focus on clean software architecture, caching efficiency, and database query optimizations. It focuses on separating infrastructure logic from core business logic using structured layers and the Repository pattern, ensuring that components remain testable, maintainable, and swapable.

## Key Features

*   **Authentication**: Stateless JWT-based authentication, password hashing with bcrypt, and secure route verification.
*   **URL Management**: Custom aliases, auto-generated unique short codes, expiration timestamps, soft deletion to preserve database integrity, and comprehensive retrieval endpoints.
*   **Redirection & Validation**: Highly optimized redirection routing, expired link validation, and custom validations for URLs, emails, and passwords.
*   **Analytics Tracking**: Relational log storage tracking every redirection event to calculate real-time click statistics.
*   **Redis Caching**: Cache-Aside implementation to handle redirection requests without hitting the relational database, complete with TTL invalidations and database fallbacks.
*   **Centralized Error Handling**: Custom error hierarchy coupled with Express middleware to guarantee consistent JSON responses for client requests.

## Tech Stack

*   **Runtime**: Node.js
*   **Framework**: Express.js 5
*   **Database**: MySQL 8 (Relational Storage)
*   **Caching**: Redis (In-Memory Key-Value)
*   **Containerization**: Docker (for running isolated services like Redis)
*   **Security**: JWT (`jsonwebtoken`) for authorization, `bcrypt` for secure hashing
*   **Development**: Nodemon (automatic reload)
*   **Architecture**: Layered Architecture, Repository Pattern

## Architecture Overview

The system processes client requests by propagating them through distinct architectural boundaries. The routing layer acts as the entry gate, passing requests through authentication and validation middleware. Once checked, a controller parses parameters and invokes business logic contained inside the service layer. The service layer coordinates with the repository layer to persist data in MySQL or retrieve caching objects from Redis.

```
Client
  │
  ▼
[Express Routes] (auth.middleware.js, validators)
  │
  ▼
[Controllers] (Extract payloads, formulate responses)
  │
  ▼
[Services] (Business logic, Cache-Aside orchestration)
  │                       │
  │ (Cache Miss/Write)    │ (Cache Check)
  ▼                       ▼
[Repositories] <───> [Redis Cache] (In-memory lookup)
  │
  ▼
[MySQL Database] (Persistent storage)
```

## Folder Structure

```
backend/
├── docker-compose.yml
├── package.json
├── .env
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── redis.js
│   ├── constants/
│   │   └── cache.constants.js
│   ├── controllers/
│   │   ├── analytics.controller.js
│   │   ├── auth.controller.js
│   │   ├── index.controller.js
│   │   ├── redirect.controller.js
│   │   └── url.controller.js
│   ├── database/
│   │   ├── connection.js
│   │   └── schema/
│   │       └── schema.sql
│   ├── errors/
│   │   ├── AppError.js
│   │   ├── ConflictError.js
│   │   ├── NotFoundError.js
│   │   ├── ValidationError.js
│   │   └── UnauthorizedError.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── repositories/
│   │   ├── analytics.repository.js
│   │   ├── url.repository.js
│   │   └── user.repository.js
│   ├── routes/
│   │   └── api/
│   │       └── v1/
│   │           ├── analytics.routes.js
│   │           ├── auth.routes.js
│   │           ├── index.routes.js
│   │           ├── redirect.routes.js
│   │           └── url.routes.js
│   ├── services/
│   │   ├── analytics.service.js
│   │   ├── auth.service.js
│   │   ├── index.service.js
│   │   ├── redirect.service.js
│   │   ├── redis.service.js
│   │   └── url.service.js
│   ├── utils/
│   │   └── cache.util.js
│   └── validators/
│       ├── auth.validator.js
│       └── url.validator.js
```

## Folder Explanation

*   `config/`: Initializes client configurations (such as Redis connections).
*   `constants/`: Houses application configuration constants and TTL options.
*   `controllers/`: Extracts parameters from HTTP requests and delegates logic execution to services.
*   `database/`: Handles database pool creation and raw SQL schema definitions.
*   `errors/`: Exposes custom error classes extending JavaScript's native error constructor.
*   `middleware/`: Intercepts requests for task processing (such as JWT decoding or error serialization).
*   `repositories/`: Houses direct SQL database communication logic.
*   `routes/`: Organizes end-points grouped by API resource domain.
*   `services/`: Encapsulates primary business functions, validation checks, and cache bindings.
*   `utils/`: Contains reusable helper logic (such as string generators and key formatters).
*   `validators/`: Validates raw client inputs before request ingestion.

## Installation

### Prerequisites

*   Node.js (v18.0 or higher)
*   MySQL Server 8.0
*   Docker (to orchestrate the Redis environment)

### Environment Variables

Configure a `.env` file in the root of the `backend/` directory using this format:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=url_shortener
DB_USER=root
DB_PASSWORD=your_mysql_password

JWT_SECRET=your_jwt_signing_secret_key
JWT_EXPIRES_IN=1d

REDIS_HOST=localhost
REDIS_PORT=6379
```

### Database Setup

1. Connect to your MySQL server and create the database:
   ```sql
   CREATE DATABASE url_shortener;
   ```
2. Import the database schema tables and index relationships:
   ```bash
   mysql -u root -p url_shortener < src/database/schema/schema.sql
   ```

### Redis Setup using Docker

Launch an isolated Redis instance on your host system:

```bash
docker run --name redis-url-shortener -p 6379:6379 -d redis:alpine
```

Alternatively, configure the root `docker-compose.yml` to orchestrate this service:

```yaml
version: '3.8'
services:
  redis:
    image: redis:alpine
    container_name: redis-url-shortener
    ports:
      - "6379:6379"
    restart: always
```

Deploy using:
```bash
docker compose up -d
```

### Running the Project

1. Install project dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

### Available Scripts

*   `npm start`: Launches the server in production mode using Node.js.
*   `npm run dev`: Boots the application in development mode with Nodemon for hot reloading.

## API Overview

### Authentication Flow
Users register accounts by submitting credentials. Password hashes are saved to the database using bcrypt encryption. Upon logging in, credential validation checks query the database and verify hashes. If validation matches, the API responds with a JSON Web Token (JWT) that encapsulates user identity, signed against a secure private key.

### URL Management Flow
Authenticated requests to generate short links accept a target URL, an optional custom alias, and an optional expiry date. When custom alias validation passes, it reserves the string. Otherwise, a random 7-character string is created using a base-62 generator. Created links can be queried, modified, or soft-deleted using resource-scoped API routes.

### Redirect Flow
When clients visit a redirect URL containing a short code, the service intercepts it. It queries Redis for target records. On a cache hit, the target URL is retrieved and returned instantly. On a cache miss, the system fetches records from MySQL, verifies active status, builds the cache in Redis, writes a click register event to database logs, and redirects clients to original destinations via a `302 Found` header.

## Redis Caching

To scale throughput, the system offloads high-volume read requests to Redis using standard caching patterns:

*   **Cache-Aside Pattern**: Redirection paths inspect the Redis cache first. If found, the application returns it. If not, it requests details from the MySQL database, updates Redis with a cache entry, and returns the response.
*   **Cache Hit**: Occurs when key parameters are present in Redis. The request resolves without querying MySQL, resulting in response times under 5 milliseconds.
*   **Cache Miss**: Occurs when key parameters are not present in Redis. The service retrieves the configuration from the database and updates Redis dynamically.
*   **TTL (Time to Live)**: Cached records are configured with an expiration window (e.g., 24 hours). This manages memory footprint by purging rarely accessed records.
*   **Cache Invalidation**: On URL updates or soft deletions, the corresponding cache key is immediately removed from Redis. This prevents stale caches from routing traffic to broken destinations.
*   **Redis Fallback**: Catch blocks surround all Redis cache-related operations. If the Redis server experiences down-time, requests log errors and route queries directly to MySQL, keeping the redirection path functional.

## Database Design

### users
Holds account attributes required for authentication.
*   `id` (BIGINT, PRIMARY KEY): Auto-incrementing identifier.
*   `username` (VARCHAR): Unique username constraint.
*   `email` (VARCHAR): Unique email index used to verify and log accounts.
*   `password_hash` (VARCHAR): Encrypted user credentials.
*   `deleted_at` (TIMESTAMP): Soft delete tracker for account terminations.

### urls
Holds short-to-long URL mappings and ownership details.
*   `id` (BIGINT, PRIMARY KEY): Auto-incrementing identifier.
*   `user_id` (BIGINT, FOREIGN KEY): Maps the creator of the shortened URL.
*   `original_url` (TEXT): The destination URL where users redirect.
*   `short_code` (VARCHAR): Unique 7-character routing alias.
*   `custom_alias` (BOOLEAN): Flag indicating if the short code is user-defined.
*   `expires_at` (TIMESTAMP): Optional datetime configuration to trigger url invalidation.
*   `deleted_at` (TIMESTAMP): Soft delete tracker for invalidating redirects without deleting database records.

### analytics
Records click logs for performance checks.
*   `id` (BIGINT, PRIMARY KEY): Unique identifier.
*   `url_id` (BIGINT, FOREIGN KEY): Maps back to the parent URL entry.
*   `clicked_at` (TIMESTAMP): Log record created on redirection event execution.

## Authentication

The project uses JWT stateless authentication to authorize endpoints:

1.  **Token Issuance**: Users log in, and the server generates a token containing `id` and `username` claims, signed against the `JWT_SECRET`.
2.  **Token Transport**: Clients store this token and attach it to subsequent headers: `Authorization: Bearer <token>`.
3.  **Token Authentication**: Express routes run middleware to intercept and decode keys. If the token is valid, properties are bound to `req.user`. If missing, corrupt, or expired, the request is terminated with a `401 Unauthorized` status code.

## Request Lifecycle

Below is the execution flow of an endpoint call:

```
Client ──► Routes ──► Controllers ──► Services ──► Repositories ──► Database
```

1.  **Routes**: Intercept incoming TCP packets, match headers against URI patterns, execute authorization filters, and invoke controllers.
2.  **Controller**: Extracts routing variables, calls request payload validations, and delegates operations to services.
3.  **Service**: Validates business rules, implements custom constraints, handles caching updates, and commands data synchronization through repository layers.
4.  **Repository**: Encapsulates raw SQL queries to prevent database details from bleeding into service rules.
5.  **Database**: MySQL reads execution requests, performs indexes lookup, updates tables, and returns data results back to the repository.

## Validation

The validation strategy implements manual validation logic inside the `validators/` directory, avoiding bloated external libraries. The validators enforce formatting constraints:
*   **Original URL**: Checked using the Node `URL` constructor.
*   **Custom Aliases**: Checked using regex constraints (`/^[a-zA-Z0-9_-]+$/`) and string lengths (between 3 and 50 characters).
*   **Expiration Dates**: Ensured to represent a valid future date configuration.
*   **Credentials**: Email structure checked via standard email patterns, and password lengths validated at registration.

## Error Handling

The application leverages a central error middleware (`error.middleware.js`) to handle errors uniformly. It uses a custom error class hierarchy:

```
                  ┌────────────┐
                  │   Error    │
                  └─────┬──────┘
                        │
                  ┌─────▼──────┐
                  │  AppError  │ (Base custom class)
                  └─────┬──────┘
      ┌─────────────────┼──────────────────┐
┌─────▼──────┐    ┌─────▼──────┐     ┌─────▼──────┐
│ValidationError│ │NotFoundError│    │ConflictError│
└────────────┘    └────────────┘     └────────────┘
```

*   `AppError`: Extends native Errors and binds custom status codes.
*   `ValidationError` (400): Thrown when request payloads violate formatting criteria.
*   `UnauthorizedError` (401): Thrown when JWT access keys are invalid or missing.
*   `NotFoundError` (404): Thrown when URLs are missing, expired, or soft-deleted.
*   `ConflictError` (409): Thrown when user credentials or custom aliases violate uniqueness limits.

Uncaught exceptions call the error middleware, serializing details into client JSON bodies:
```json
{
  "success": false,
  "message": "Error description details"
}
```

## Security Features

*   **Bcrypt Hashing**: Protects credentials from exposure in case of database leaks.
*   **JWT Access Keys**: Prevents session hijacking and eliminates database-backed session table queries.
*   **Parameterized SQL**: All query bindings execute via `pool.execute(sql, [params])` to eliminate SQL injection attacks.
*   **Resource Ownership Checks**: Compares `req.user.id` against database values before executing changes.
*   **Soft Deletion Execution**: Uses queries matching `deleted_at IS NULL` to bypass routing access for deleted objects while preserving analytics logs.

## Project Highlights

*   **Layered Architecture**: Decouples presentation logic, business logic, and database access. This ensures that scaling individual layers does not require rewriting the entire application.
*   **Repository Pattern**: Isolates direct SQL commands. If the database engine changes from MySQL to PostgreSQL, only the repository files need modification.
*   **Redis Integration**: Offloads hot redirection reads from disk-backed storage to memory, reducing infrastructure costs.
*   **Soft Delete**: Avoids database cascading issues by retaining references. Analytics click history remains queryable for historic reports.
*   **Stateless JWT**: Allows the backend application instance to scale horizontally without syncing active session states.

## API Endpoints

### Authentication

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Public | Registers a user account |
| `POST` | `/api/v1/auth/login` | Public | Validates user and returns JWT access token |

### URLs

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/urls` | Protected | Creates a new shortened URL |
| `GET` | `/api/v1/urls` | Protected | Lists all active URLs created by the authenticated user |
| `GET` | `/api/v1/urls/:id` | Protected | Retrieves configuration metadata of a specific URL by ID |
| `PUT` | `/api/v1/urls/:id` | Protected | Updates the target URL or expiration timestamp |
| `DELETE` | `/api/v1/urls/:id` | Protected | Soft-deletes a URL and invalidates its redirection cache |

### Analytics

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/analytics/:urlId` | Protected | Fetches total redirections and click logs for a URL |

### Redirect

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/redirect/:shortCode` | Public | Resolves short link and redirects to destination |

## Configuration

*   `package.json`: Configures start commands, Nodemon watch directories, project metadata, dependency versions, and uses `"type": "module"` for native ES Module configurations.
*   `.env`: Declares local database configurations, ports, encryption secrets, and Docker environment variables.
*   `ES Modules`: Embraces native Node import/export syntax for clean, standardized module separation across files.

## Future Improvements

*   React Frontend
*   BullMQ Background Jobs
*   Swagger/OpenAPI Documentation
*   Automated Testing using Jest & Supertest
*   Structured Logging
*   Rate Limiting
*   Health Check Endpoint
*   CI/CD
*   Deployment

## Contributing

1.  Fork this repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your modifications (`git commit -m 'Add some AmazingFeature'`).
4.  Push your branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Abhiraj Kumar
