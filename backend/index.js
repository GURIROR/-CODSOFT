const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

// Job Schema
const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
});

const Job = mongoose.model("Job", jobSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Job Board API is Running!");
});

// Get all jobs
app.get("/api/jobs", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// Add a new job
app.post("/api/jobs", async (req, res) => {
  const { title, company, location, description } = req.body;
  const newJob = new Job({ title, company, location, description });
  await newJob.save();
  res.json({ message: "Job added successfully!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
