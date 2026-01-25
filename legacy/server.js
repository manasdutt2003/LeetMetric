// server.js

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ LeetCode API Proxy Route
app.post("/api/leetcode", async (req, res) => {
  const { username } = req.body;

  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        profile {
          ranking
        }
      }
    }
  `;

  try {
    const response = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { username } }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start the server
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));

