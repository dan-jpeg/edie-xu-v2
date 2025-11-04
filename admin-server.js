// admin-server.js - SECURE VERSION
import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Environment variables (REQUIRED)
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret-key";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH; // bcrypt hash
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:5173";

// CORS - restrict to your frontend domain
app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());

const DATA_FILE = path.join(__dirname, "src/data/projects-and-videos.js");
const BACKUP_DIR = path.join(__dirname, "backups");

await fs.mkdir(BACKUP_DIR, { recursive: true });

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { password } = req.body;

  try {
    // Compare with hashed password
    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: "24h" });

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Protected routes - all require authentication
app.get("/api/data", authenticateToken, async (req, res) => {
  try {
    const fileContent = await fs.readFile(DATA_FILE, "utf-8");
    const dataUrl = `${DATA_FILE}?update=${Date.now()}`;
    const module = await import(dataUrl);

    const data = {
      selectedWorks: module.selectedWorks || [],
      videos: module.videos || [],
      exhibitions: module.exhibitions2 || [],
    };

    res.json(data);
  } catch (error) {
    console.error("Error reading data:", error);
    res.status(500).json({ error: "Failed to read data" });
  }
});

app.post("/api/data", authenticateToken, async (req, res) => {
  try {
    const { selectedWorks, videos, exhibitions } = req.body;

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFile = path.join(
      BACKUP_DIR,
      `projects-and-videos-${timestamp}.js`,
    );

    const currentContent = await fs.readFile(DATA_FILE, "utf-8");
    await fs.writeFile(backupFile, currentContent);

    const newContent = `const selectedWorks = ${JSON.stringify(selectedWorks, null, 2)};

export { selectedWorks };

const videos = ${JSON.stringify(videos, null, 2)};

export { videos };

const exhibitions2 = ${JSON.stringify(exhibitions, null, 2)};

export { exhibitions2 };
`;

    await fs.writeFile(DATA_FILE, newContent);

    console.log("Data saved successfully");
    console.log("Backup created:", backupFile);

    res.json({
      success: true,
      message: "Data saved successfully",
      backup: backupFile,
    });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

app.get("/api/backups", authenticateToken, async (req, res) => {
  try {
    const files = await fs.readdir(BACKUP_DIR);
    const backups = files
      .filter((f) => f.startsWith("projects-and-videos-"))
      .map((f) => ({
        name: f,
        path: path.join(BACKUP_DIR, f),
        timestamp: f.replace("projects-and-videos-", "").replace(".js", ""),
      }))
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));

    res.json(backups);
  } catch (error) {
    console.error("Error reading backups:", error);
    res.status(500).json({ error: "Failed to read backups" });
  }
});

app.post("/api/restore", authenticateToken, async (req, res) => {
  try {
    const { backupName } = req.body;
    const backupPath = path.join(BACKUP_DIR, backupName);

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const currentBackup = path.join(BACKUP_DIR, `pre-restore-${timestamp}.js`);
    const currentContent = await fs.readFile(DATA_FILE, "utf-8");
    await fs.writeFile(currentBackup, currentContent);

    const backupContent = await fs.readFile(backupPath, "utf-8");
    await fs.writeFile(DATA_FILE, backupContent);

    console.log("Restored from backup:", backupName);
    console.log("Pre-restore backup saved:", currentBackup);

    res.json({
      success: true,
      message: "Data restored successfully",
      preRestoreBackup: currentBackup,
    });
  } catch (error) {
    console.error("Error restoring backup:", error);
    res.status(500).json({ error: "Failed to restore backup" });
  }
});

app.listen(PORT, () => {
  console.log(`\n✅ Admin server running on port ${PORT}`);
  console.log(`📁 Data file: ${DATA_FILE}`);
  console.log(`💾 Backups directory: ${BACKUP_DIR}\n`);
});
