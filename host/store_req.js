// to store any remote messages to the page

const express = require("express")
const cors = require("cors")
const fetch = require("node-fetch")
const dotenv = require("dotenv")

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
    console.log(req.body)

    res.redirect("http://localhost:5500/archive/pages/logs.html")
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = 3000;
store_route.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});