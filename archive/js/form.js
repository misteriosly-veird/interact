fetch("components/form.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("form-container").innerHTML = html;

    // Select the form after it's loaded
    const form = document.querySelector("#form-container form");
    const messageEl = document.getElementById("form-message"); // the hidden p element

    // Add a submit handler
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // prevent default page reload

      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        // Send POST request to your server
        const response = await fetch(form.action, {
          method: form.method,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        // Parse JSON response
        const result = await response.json();

        // Display server response in the hidden p element
        messageEl.style.display = "block";
        if (response.ok) {
          messageEl.style.color = "green";
          messageEl.textContent = "Success: " + result.message;
        } else {
          messageEl.style.color = "red";
          messageEl.textContent = "Error: " + result.error;
        }
      } catch (err) {
        console.error("Fetch error:", err);
        messageEl.style.display = "block";
        messageEl.style.color = "red";
        messageEl.textContent = "Something went wrong. Check console for details.";
      }
    });
  });