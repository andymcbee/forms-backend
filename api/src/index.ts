import loadEnv from "./config/loadEnv";

// Load the appropriate .env file

if (process.env.NODE_ENV !== "production") {
  loadEnv();
} else {
  console.log("NODE_ENV set to production. No .env file needs to be loaded.");
}

import db from "./config/db";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import formRoutes from "./routes/formRoutes";

const app = express();
const PORT = process.env.PORT || 3222;

// Database connection check
db.connect()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Failed to connect to database", err));

app.use(helmet());

const corsOptions = {
  origin: [
    "https://customertrust.io",
    "http://customertrust.io",
    "http://localhost:3001"
  ],
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

// Limiter is meant to avoid spam on the submissions endpoint. If we expand API,
// create a subsmissions specific limiter so we can control both independantly

const limiterMaxPerWindow = 100;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: limiterMaxPerWindow // limit each IP to 100 requests per windowMs
});

// check if limiter is above 20, which is likely to be too much per ip for form submissions
const limitToWarn = 20;
if (limiterMaxPerWindow > limitToWarn) {
  console.log(
    `Warning: more than ${limitToWarn} requests per window. Allow ${limiterMaxPerWindow} per window.`
  );
}
app.use(limiter);

app.use(express.json());

app.use("/api/v1/forms", formRoutes);

const server = app.listen(PORT, () => {
  console.log("This is a test. #123.");
  console.log(`Server is running on port ${PORT}`);
});

export { app, server }; // Export the server for use in tests
