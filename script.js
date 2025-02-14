document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "https://wastedetector-api-baayfjebayg6haee.westeurope-01.azurewebsites.net/api/waste"; // Your API
    const refreshButton = document.getElementById("refresh");

    function fetchData() {
        document.getElementById("loading").style.display = "block";
        document.getElementById("errorMessage").innerText = "";
        document.getElementById("tableBody").innerHTML = "";

        fetch(API_URL)
            .then(response => {
                console.log("Raw Response:", response); // Debugging
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("API Data Received:", data); // Log received data
                const tableBody = document.getElementById("tableBody");
                document.getElementById("loading").style.display = "none";

                if (!Array.isArray(data) || data.length === 0) {
                    document.getElementById("errorMessage").innerText = "No data available.";
                    return;
                }

                data.forEach(item => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${item.ID || "N/A"}</td>
                        <td>${item.DeviceId || "N/A"}</td>
                        <td>${item.Timestamp ? new Date(item.Timestamp).toLocaleString() : "N/A"}</td>
                        <td>${item.WasteLevel || "N/A"}</td>
                        <td>${item.ProcessingTime ? new Date(item.ProcessingTime).toLocaleString() : "N/A"}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error("API Fetch Error:", error);
                document.getElementById("errorMessage").innerText = `Error fetching data: ${error.message}`;
                document.getElementById("loading").style.display = "none";
            });
    }

    // Load data on page load
    fetchData();

    // Refresh button functionality
    refreshButton.addEventListener("click", fetchData);
});
