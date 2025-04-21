// const mongoose = require('mongoose');
 
// const alarmSchema = new mongoose.Schema({
//   SqlId: {
//     type: Number
//   },
//   AlarmId: {
//     type: Number,
//     required: true
//   },
//   DeviceId: {
//     type: Number,
//     required: true
//   },
//   AlarmValue: {
//     type: String
//   },
//   CreatedBy: {
//     type: Number
//   },
//   IsActive: {
//     type: Boolean,
//     default: true
//   },
//   CreatedTimestamp: {
//     type: Date,
//     default: Date.now
//   },
//   TelemetryKeyId: {
//     type: Number
//   },
//   AlarmRootCauseId: {
//     type: Number
//   },
//   UpdatedBy: {
//     type: Number
//   },
//   UpdatedTimestamp: {
//     type: Date,
//     default: Date.now
//   },
//   AlarmCode: {
//     type: String
//   },
//   AlarmDescription: {
//     type: String
//   },
//   DeviceName: {
//     type: String
//   },
//   IsRead: {
//     type: Boolean,
//     default: false
//   }
// });
 
// module.exports = mongoose.model('Alarm', alarmSchema);

const mongoose = require('mongoose');
require("dotenv").config();

// Create a separate connection to the `oxygen_monitor` DB
const dbURI = process.env.MONGO_URI_OXYGEN || "mongodb+srv://garvisha:apphelix@oxygen-monitor.ivkylso.mongodb.net/oxygen_monitor?retryWrites=true&w=majority&appName=Oxygen-Monitor";

console.log('Connecting to oxygen_monitor database with URI:', dbURI);

const oxygenConnection = mongoose.createConnection(
  dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Log connection status
oxygenConnection.on('connected', () => {
  console.log('✅ Successfully connected to oxygen_monitor database');
});

oxygenConnection.on('error', (err) => {
  console.error('❌ Error connecting to oxygen_monitor database:', err);
});

// Define the schema (same as before)
const alarmSchema = new mongoose.Schema({
  AlarmId: { type: Number, required: true },
  AlarmCode: { type: String, required: true },
  AlarmName: String,
  AlarmDescription: String,
  AlarmValue: String,
  DeviceId: { type: Number, required: true },
  DeviceName: String,
  PlantName: String,
  IsActive: { type: Boolean, default: true },
  CreatedTimestamp: { type: Date, default: Date.now },
  CreatedBy: Number,
  UpdatedTimestamp: { type: Date },
  UpdatedBy: Number,
  IsRead: { type: Boolean, default: false }
});

// Export the model using the separate connection
const OxygenAlarm = oxygenConnection.model('Alarm', alarmSchema, 'alarms');

module.exports = OxygenAlarm;


