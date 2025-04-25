import { CarapisClient, CarapisClientError } from "encar";

// Assume API_KEY is available in the environment or defined elsewhere
const API_KEY = process.env.CARAPIS_API_KEY || "YOUR_API_KEY_HERE"; // Example: Replace or set environment variable

// Check if API_KEY is set - crucial for authenticated access
if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
  console.warn(
    "Warning: CARAPIS_API_KEY is not set. Using limited free tier access."
  );
  // Consider exiting or handling this case if full access is mandatory
  // process.exit(1);
}

// Main async function to run examples
export async function runEncarApiExamples() {
  let client: CarapisClient;

  try {
    // Initialize Encar API client
    // Pass the API key (or undefined/null for free tier)
    client = new CarapisClient(API_KEY);
    console.log("Carapis Encar API Client (TS) initialized successfully.");

    // --- Proceed with Encar API calls below ---

    // Example: List vehicles
    console.log("\n--- Querying Encar API for Vehicles ---");
    const vehicles = await client.listVehicles({ limit: 3, min_year: 2022 });
    console.log(
      "Vehicles Found via Encar API:",
      vehicles.results ? `${vehicles.results.length} results` : "No results"
    );
    // Add more calls here...
  } catch (error) {
    if (error instanceof CarapisClientError) {
      console.error(
        `Encar API Client Error (${error.status || "N/A"}): ${error.message}`,
        error.details ? `\nDetails: ${JSON.stringify(error.details)}` : ""
      );
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
}

// Run the examples
runEncarApiExamples();
