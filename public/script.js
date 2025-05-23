document.addEventListener("DOMContentLoaded", () => {
  // Dark mode toggle
  const toggle = document.getElementById("darkToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    // Load stored preference
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
    }
  }

  // Load tutorials from JSON
  fetch("/data/tutorials.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("tutorialCards");

      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = "<p class='text-muted'>No tutorials found.</p>";
        return;
      }

      data.forEach(tutorial => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";

        col.innerHTML = `
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${tutorial.title}</h5>
              <p class="card-text">${tutorial.description}</p>
              <a href="${tutorial.link}" class="btn btn-primary" target="_blank">Learn More</a>
            </div>
          </div>
        `;

        container.appendChild(col);
      });
    })
    .catch(error => {
      console.error("Error loading tutorials:", error);
      document.getElementById("tutorialCards").innerHTML = "<p class='text-danger'>Failed to load tutorials.</p>";
    });
});
