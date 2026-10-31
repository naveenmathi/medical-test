# BIO FORTIS Medical Dashboard

BIO FORTIS is a comprehensive clinical trial and biobank management dashboard. It tracks biomarkers, physical storage locations, sample expiry, and ensures audit compliance for Informed Consent Forms (ICFs). It features a robust Node.js/SQLite backend and a highly dynamic React/Tailwind frontend.

## 🚀 Local Development Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

### 1. Running the Backend
The backend serves the API and manages the SQLite database.
\`\`\`bash
cd backend
# Install dependencies
npm install

# Start the development server (runs on http://localhost:5000)
npm run start
# Note: Since we installed nodemon, you can also use:
npx nodemon server.js
\`\`\`

**Seeding the Database:** 
Once the backend is running, you can populate the database with dummy data (Patients, Samples, Biomarkers) by making a quick POST request:
\`\`\`bash
curl -X POST http://localhost:5000/api/seed
\`\`\`

### 2. Running the Frontend
The frontend uses a custom Webpack setup with React and Tailwind CSS v3.
\`\`\`bash
cd frontend
# Install dependencies
npm install

# Start the Webpack dev server (runs on http://localhost:3000)
npm start
\`\`\`
The application will automatically proxy API requests from port 3000 to the backend on port 5000.

---

## 🌍 Production Rollout Steps

Rolling this application out to a production environment requires a few optimizations to ensure security, performance, and stability.

### 1. Frontend Production Build
You should never run the Webpack dev server in production. Instead, build static assets and serve them using a web server like Nginx, Apache, or a CDN (e.g., Vercel, Netlify, AWS S3).
\`\`\`bash
cd frontend
# Generate optimized, minified production assets
npm run build
\`\`\`
- This will output a `dist` folder containing `bundle.js` and `index.html`. 
- Configure your web server (e.g., Nginx) to serve the `dist` directory and route all unknown requests to `index.html` (to support React Router).

### 2. Backend Production Setup
The backend should be run using a process manager like **PM2** to ensure it restarts automatically if it crashes.
\`\`\`bash
cd backend
npm install -g pm2
pm2 start server.js --name "biofortis-api"
\`\`\`
- **Environment Variables**: Move hardcoded secrets (like `SECRET_KEY = 'biofortis_super_secret_key'`) into a `.env` file using the `dotenv` package.
- **Port Binding**: Ensure your backend port (default 5000) is properly exposed or proxied through your reverse proxy (e.g., Nginx).

### 3. Database Migration (Important)
- **Current State**: The app uses `SQLite`, which stores data in a local `biofortis.db` file. This is perfect for prototyping, learning, and low-traffic deployments.
- **Production State**: If you anticipate high concurrency or deploy to serverless/ephemeral environments (like Heroku or Docker containers without volume mounts), you **must** migrate to a robust relational database like **PostgreSQL** or **MySQL**. 
- Update `backend/db.js` to connect to a production database URI instead of a local file.

### 4. Security Enhancements
- **CORS**: Update the `app.use(cors())` configuration in `server.js` to only allow requests from your production frontend domain, instead of allowing all origins.
- **Password Hashing**: Currently, user passwords are saved as plaintext for prototyping. Install `bcrypt` in the backend and hash passwords during the `/register` flow before storing them in the database.
- **HTTPS**: Secure your frontend and backend API with SSL certificates (e.g., Let's Encrypt).