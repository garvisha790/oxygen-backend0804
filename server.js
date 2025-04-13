require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // MongoDB connection
const { connectCosmosDB } = require("./config/CosmosDB"); // CosmosDB connection

// Route imports
const authRoutes = require("./routes/authRoutes");
const plantRoutes = require("./routes/plantRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const telemetryRoutes = require("./routes/telemetryRoutes");
const azureDeviceRoutes = require("./routes/azureDevice");
const alarmRoutes = require('./routes/alarmRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB()
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
  });

// Connect to CosmosDB
connectCosmosDB()
  .then(() => console.log("✅ CosmosDB Connected!"))
  .catch((err) => {
    console.error("❌ CosmosDB Connection Failed:", err);
    process.exit(1);
  });

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/telemetry", telemetryRoutes);
app.use("/api/azure", azureDeviceRoutes);
app.use('/api/alarms', alarmRoutes);

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Backend API running at http://0.0.0.0:${PORT}`);
});
