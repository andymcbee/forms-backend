import dotenv from "dotenv";
dotenv.config();
import { run } from "./consumers/formSubmissionsConsumer";

console.log("testing");

run().catch(console.error);

console.log("After run()");
