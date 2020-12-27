import "reflect-metadata";
import { config } from "dotenv";
config();

try {
  process.exit(0);
} catch (error) {
  console.error("Fatal error: ", error);
  process.exit(1);
}
