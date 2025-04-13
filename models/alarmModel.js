const mongoose = require('mongoose');
 
const alarmSchema = new mongoose.Schema({
  SqlId: {
    type: Number
  },
  AlarmId: {
    type: Number,
    required: true
  },
  DeviceId: {
    type: Number,
    required: true
  },
  AlarmValue: {
    type: String
  },
  CreatedBy: {
    type: Number
  },
  IsActive: {
    type: Boolean,
    default: true
  },
  CreatedTimestamp: {
    type: Date,
    default: Date.now
  },
  TelemetryKeyId: {
    type: Number
  },
  AlarmRootCauseId: {
    type: Number
  },
  UpdatedBy: {
    type: Number
  },
  UpdatedTimestamp: {
    type: Date,
    default: Date.now
  },
  AlarmCode: {
    type: String
  },
  AlarmDescription: {
    type: String
  },
  DeviceName: {
    type: String
  },
  IsRead: {
    type: Boolean,
    default: false
  }
});
 
module.exports = mongoose.model('Alarm', alarmSchema);