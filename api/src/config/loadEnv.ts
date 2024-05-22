import dotenv from "dotenv";
import path from "path";
import fs from "fs"; // Required to check if file exists

const loadEnv = () => {
  const env = process.env.NODE_ENV || "development";
  let envFile;

  switch (env) {
    case "docker":
      envFile = ".env.docker";
      break;
    case "development":
    default:
      envFile = ".env.local";
      break;
  }

  const envPath = path.resolve(__dirname, "..", "..", envFile as string); // Adjusted path
  console.log(`Trying to load: ${envPath}`); // Debugging output

  // Check if the file exists before trying to load it
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`Successfully loaded ${envFile} file.`);
  } else {
    console.log(`Failed to load ${envFile} - file not found.`);
  }
};

export default loadEnv;
