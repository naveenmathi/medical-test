const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'biofortis_super_secret_key'; // Hardcoded for learning purposes

app.use(cors());
app.use(express.json());

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- API Routes ---

// Auth: Register
app.post('/api/auth/register', (req, res) => {
  const { username, email, password, role } = req.body;
  // In a real app, hash the password using bcrypt. Here we store plain for simplicity
  db.run(`INSERT INTO Users (username, email, password_hash, role) VALUES (?, ?, ?, ?)`,
    [username, email, password, role || 'client'],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({ id: this.lastID, username, role: role || 'client' });
    }
  );
});

// Auth: Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM Users WHERE username = ? AND password_hash = ?`, [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: row.id, username: row.username, role: row.role }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ token, user: { id: row.id, username: row.username, role: row.role } });
  });
});

// Patients: Get all
app.get('/api/patients', authenticateToken, (req, res) => {
  db.all(`SELECT * FROM Patients`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Biomarkers: Get for a patient
app.get('/api/biomarkers/:patientId', authenticateToken, (req, res) => {
  db.all(`SELECT * FROM Biomarkers WHERE patient_id = ? ORDER BY recorded_at ASC`, [req.params.patientId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Samples: Get all
app.get('/api/samples', authenticateToken, (req, res) => {
  db.all(`
    SELECT Samples.*, Patients.name as patient_name 
    FROM Samples 
    JOIN Patients ON Samples.patient_id = Patients.id
  `, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Dashboard: Metrics
app.get('/api/dashboard/metrics', authenticateToken, (req, res) => {
  const metrics = {};
  
  db.get(`SELECT COUNT(*) as count FROM Patients`, [], (err, row) => {
    metrics.totalPatients = row.count;
    
    db.get(`SELECT COUNT(*) as count FROM Samples`, [], (err, row2) => {
      metrics.totalSamples = row2.count;
      
      db.get(`SELECT COUNT(*) as count FROM Samples WHERE expiry_date < datetime('now', '+7 days')`, [], (err, row3) => {
        metrics.expiringSamples = row3.count;
        res.json(metrics);
      });
    });
  });
});

// Create initial dummy data for testing
app.all('/api/seed', (req, res) => {
  db.serialize(() => {
    // Seed Patients
    db.run(`INSERT OR IGNORE INTO Patients (name, informed_consent_status) VALUES ('John Doe', 1)`);
    db.run(`INSERT OR IGNORE INTO Patients (name, informed_consent_status) VALUES ('Jane Smith', 1)`);
    
    // Seed Biomarkers for patient 1
    db.run(`INSERT OR IGNORE INTO Biomarkers (patient_id, rbc, wbc, platelets, recorded_at) VALUES (1, 4.5, 6.2, 150, datetime('now', '-3 days'))`);
    db.run(`INSERT OR IGNORE INTO Biomarkers (patient_id, rbc, wbc, platelets, recorded_at) VALUES (1, 4.6, 6.5, 155, datetime('now', '-2 days'))`);
    db.run(`INSERT OR IGNORE INTO Biomarkers (patient_id, rbc, wbc, platelets, recorded_at) VALUES (1, 4.8, 6.8, 160, datetime('now', '-1 days'))`);
    
    // Seed Samples
    db.run(`INSERT OR IGNORE INTO Samples (patient_id, type, expiry_date, status) VALUES (1, 'Blood', datetime('now', '+30 days'), 'Stored')`);
    db.run(`INSERT OR IGNORE INTO Samples (patient_id, type, expiry_date, status) VALUES (2, 'Tissue', datetime('now', '+2 days'), 'Stored')`);
  });
  res.json({ message: 'Seeded database' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
