document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");
  const statsContainer = document.querySelector(".stats-container");
  const easyLabel = document.getElementById("easy-label");
  const mediumLabel = document.getElementById("medium-label");
  const hardLabel = document.getElementById("hard-label");

  // ✅ Validate LeetCode username
  function validateUsername(username) {
    if (username.trim() === "") {
      alert("Username should not be empty");
      return false;
    }

    const regex = /^[a-zA-Z0-9_]{3,16}$/;
    if (!regex.test(username)) {
      alert("Invalid Username — only letters, numbers, underscores (3–16 chars)");
      return false;
    }
    return true;
  }

  // ✅ Fetch LeetCode user data from backend
  async function fetchUserDetails(username) {
    const url = "http://localhost:3000/api/leetcode"; // our backend endpoint

    try {
      searchButton.textContent = "Searching...";
      searchButton.disabled = true;
      statsContainer.innerHTML = "<p>Loading user data...</p>";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ LeetCode Data:", data);

      const user = data.data?.matchedUser;

      if (!user) {
        statsContainer.innerHTML = `<p>No user found with username "${username}"</p>`;
        return;
      }

      // ✅ Extract stats
      const stats = user.submitStats?.acSubmissionNum || [];
      const easy = stats.find((d) => d.difficulty === "Easy")?.count || 0;
      const medium = stats.find((d) => d.difficulty === "Medium")?.count || 0;
      const hard = stats.find((d) => d.difficulty === "Hard")?.count || 0;
      const ranking = user.profile?.ranking ?? "N/A";

      // ✅ Display data in UI
      statsContainer.innerHTML = `
        <div class="user-card">
          <h2>${username}</h2>
          <p><strong>Ranking:</strong> ${ranking}</p>
          <div class="stats">
            <p id="easy-label">🟢 Easy: ${easy}</p>
            <p id="medium-label">🟡 Medium: ${medium}</p>
            <p id="hard-label">🔴 Hard: ${hard}</p>
          </div>
        </div>
      `;

    } catch (error) {
      console.error("❌ Error fetching data:", error);
      statsContainer.innerHTML = `<p>Error fetching data. Try again later.</p>`;
    } finally {
      searchButton.textContent = "Search";
      searchButton.disabled = false;
    }
  }

  // ✅ Button click handler
  searchButton.addEventListener("click", function () {
    const username = usernameInput.value.trim();
    if (validateUsername(username)) {
      fetchUserDetails(username);
    }
  });

  // ✅ Allow pressing Enter key to trigger search
  usernameInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchButton.click();
    }
  });
});

