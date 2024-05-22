import loadEnv from "./config/loadEnv";

// Load the appropriate .env file

if (process.env.NODE_ENV !== "production") {
  loadEnv();
} else {
  console.log("NODE_ENV set to production. No .env file needs to be loaded.");
}

import { run } from "./consumers/formSubmissionsConsumer";

run().catch(console.error);
