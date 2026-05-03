// to store any remote messages to the page

const express = require("express")
const cors = require("cors")
const fetch = require("node-fetch")
const dotenv = require("dotenv")
const path = require("path");
const fs = require("fs");

// dotenv.config();

const store_route = express();

// allow your static site perform corss origin requests
store_route.use(cors({
  origin: "*" // lock this down later to accept github hosted static site req
}));

store_route.use(express.json());
store_route.use(express.urlencoded({ extended: true }));


store_route.post("/api/send", async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const logEntry = {
      name,
      message,
      timestamp: new Date().toISOString(),
      ip: req.ip
    };

    const filePath = path.join(__dirname, "logs.json");

    // read existing logs
    let logs = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      logs = JSON.parse(data || "[]");
    }

    // append new log
    logs.push(logEntry);

    // write back
    fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));

    res.json({ success: true, message: "Logged successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// store_route.post("/api/send", async (req, res) => {
//   console.log("preparing....")
//   try {
//     const { name, message } = req.body;

//     if (!name || !message) {
//       return res.status(400).json({ error: "Missing fields" });
//     }
//     console.log(req.body)

//     res.redirect("http://localhost:5500/archive/pages/logs.html")
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

const PORT = 3000;
store_route.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



store_route.get("/logs", (req, res) => {
  try {
    const filePath = path.join(__dirname, "logs.json");

    if (!fs.existsSync(filePath)) {
      return res.json([]);
    }

    const data = fs.readFileSync(filePath, "utf-8");

    const logs = data ? JSON.parse(data) : [];

    res.json(logs);
  } catch (err) {
    console.error("Error reading logs:", err);
    res.status(500).json({ error: "Failed to read logs" });
  }
});