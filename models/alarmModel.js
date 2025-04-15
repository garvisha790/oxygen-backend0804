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
const dbURI = process.env.MONGO_URI_OXYGEN;
const oxygenConnection = mongoose.createConnection(
  "mongodb+srv://garvisha:apphelix@oxygen-monitor.ivkylso.mongodb.net/oxygen_monitor?retryWrites=true&w=majority&appName=Oxygen-Monitor",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Define the schema (same as before)
const alarmSchema = new mongoose.Schema({
  SqlId: Number,
  AlarmId: { type: Number, required: true },
  DeviceId: { type: Number, required: true },
  AlarmValue: String,
  CreatedBy: Number,
  IsActive: { type: Boolean, default: true },
  CreatedTimestamp: { type: Date, default: Date.now },
  TelemetryKeyId: Number,
  AlarmRootCauseId: Number,
  UpdatedBy: Number,
  UpdatedTimestamp: { type: Date, default: Date.now },
  AlarmCode: String,
  AlarmDescription: String,
  DeviceName: String,
  IsRead: { type: Boolean, default: false }
});

// Export the model using the separate connection
const OxygenAlarm = oxygenConnection.model('Alarm', alarmSchema, 'alarms');

module.exports = OxygenAlarm;


