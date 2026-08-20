import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, "..");

const packagePath = path.join(root, "package.json");

const manifestPath = path.join(root, "public", "manifest.json");

const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

const manifestJson = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

manifestJson.version = packageJson.version;

fs.writeFileSync(manifestPath, JSON.stringify(manifestJson, null, 2) + "\n");

console.log(`Manifest version updated to ${packageJson.version}`);
