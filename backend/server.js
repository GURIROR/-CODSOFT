const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Define Job Schema & Model
const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
});
const Job = mongoose.model("Job", jobSchema);

// ✅ Job Route
app.get("/api/jobs", async (req, res) => {
  try {
      const { search, location, company } = req.query;
      let query = {};

      if (search) query.title = { $regex: new RegExp(search, "i") };
      if (location) query.location = { $regex: new RegExp(location, "i") };
      if (company) query.company = { $regex: new RegExp(company, "i") };

      const jobs = await Job.find(query);
      if (!Array.isArray(jobs)) {
          return res.status(500).json({ message: "Error: Expected an array from DB" });
      }

      res.json(jobs);
  } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ message: "Error fetching jobs", error });
  }
});


// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
