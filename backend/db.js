const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'biofortis.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // Users Table
    db.run(`
      CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password_hash TEXT,
        role TEXT
      )
    `);

    // OTP/Verification Table
    db.run(`
      CREATE TABLE IF NOT EXISTS OtpVerification (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        otp_code TEXT,
        expires_at DATETIME,
        FOREIGN KEY (user_id) REFERENCES Users(id)
      )
    `);

    // Patients Table
    db.run(`
      CREATE TABLE IF NOT EXISTS Patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        informed_consent_status BOOLEAN,
        icf_document_url TEXT
      )
    `);

    // Biomarkers Table
    db.run(`
      CREATE TABLE IF NOT EXISTS Biomarkers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id INTEGER,
        rbc REAL,
        wbc REAL,
        platelets REAL,
        recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES Patients(id)
      )
    `);

    // Samples Table
    db.run(`
      CREATE TABLE IF NOT EXISTS Samples (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id INTEGER,
        type TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        expiry_date DATETIME,
        status TEXT,
        FOREIGN KEY (patient_id) REFERENCES Patients(id)
      )
    `);

    // StorageLocations Table
    db.run(`
      CREATE TABLE IF NOT EXISTS StorageLocations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        capacity INTEGER
      )
    `);

    // SampleStorage Table
    db.run(`
      CREATE TABLE IF NOT EXISTS SampleStorage (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sample_id INTEGER,
        location_id INTEGER,
        stored_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sample_id) REFERENCES Samples(id),
        FOREIGN KEY (location_id) REFERENCES StorageLocations(id)
      )
    `);

    // Clients Table
    db.run(`
      CREATE TABLE IF NOT EXISTS Clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
      )
    `);

    // Shipments Table
    db.run(`
      CREATE TABLE IF NOT EXISTS Shipments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sample_id INTEGER,
        client_id INTEGER,
        status TEXT,
        chain_of_custody_log TEXT,
        FOREIGN KEY (sample_id) REFERENCES Samples(id),
        FOREIGN KEY (client_id) REFERENCES Clients(id)
      )
    `);
  });
}

module.exports = db;
