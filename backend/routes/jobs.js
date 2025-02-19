const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const authMiddleware = require("../middleware/auth"); // Import authentication middleware

// ✅ Get all jobs (with search functionality)
router.get("/", async (req, res) => {
    try {
        const { search, location, company } = req.query;
        let query = {};

        if (search) {
            query.title = { $regex: new RegExp(search, "i") };
        }
        if (location) {
            query.location = { $regex: new RegExp(location, "i") };
        }
        if (company) {
            query.company = { $regex: new RegExp(company, "i") };
        }

        const jobs = await Job.find(query);
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching jobs", error });
    }
});

// ✅ Post a new job (Only for authenticated users)
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, company, location, description } = req.body;
        const newJob = new Job({ title, company, location, description });
        await newJob.save();
        res.status(201).json({ message: "Job posted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error posting job", error });
    }
});

// ✅ Delete a job (Only for authenticated users)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: "Job deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting job", error });
    }
});

module.exports = router;
