import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { config } from "dotenv";
import cors from "cors";

config();

const app = express();

// ✅ Required for Vercel deployment
export default app;

// ✅ Convert `import.meta.url` to a proper file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Define the file paths correctly
const districtFilePath = path.join(__dirname, "district.json");
const divisionFilePath = path.join(__dirname, "division.json");
const postcodeFilePath = path.join(__dirname, "postcode.json");
const upazilasFilePath = path.join(__dirname, "upazila.json");

// ✅ Function to safely read JSON files
const readJSONFile = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
};

// ✅ Read JSON files safely
const district = readJSONFile(districtFilePath);
const division = readJSONFile(divisionFilePath);
const postcode = readJSONFile(postcodeFilePath);
const upazilas = readJSONFile(upazilasFilePath);

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Optional for handling JSON requests

// ✅ Routes
app.get("/", (req, res) => {
  return res.status(200).json({
    districts: district || [],
    divisions: division || [],
    postcodes: postcode || [],
    upazilas: upazilas || [],
  });
});

app.get("/api/bd.district", (req, res) => {
  return res.status(200).json(district);
});
app.get("/api/bd.division", (req, res) => {
  return res.status(200).json(division);
});
app.get("/api/bd.postcode", (req, res) => {
  return res.status(200).json(postcode);
});
app.get("/api/bd.upazilas", (req, res) => {
  return res.status(200).json(upazilas);
});
