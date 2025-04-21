const mongoose = require('mongoose');
const Alarm = require('../models/alarmModel');

async function createTestAlarms() {
  try {
    // Create test alarms
    const testAlarms = [
      {
        AlarmId: 1,
        DeviceId: 1,
        AlarmCode: 'LOW_OXYGEN',
        AlarmValue: '85%',
        AlarmDescription: 'Oxygen level below threshold',
        DeviceName: 'esp32_02',
        IsActive: true,
        CreatedTimestamp: new Date(),
        IsRead: false
      },
      {
        AlarmId: 2,
        DeviceId: 2,
        AlarmCode: 'HIGH_TEMP',
        AlarmValue: '40C',
        AlarmDescription: 'Temperature above threshold',
        DeviceName: 'esp32_01',
        IsActive: true,
        CreatedTimestamp: new Date(),
        IsRead: false
      }
    ];

    // Insert the test alarms
    const result = await Alarm.insertMany(testAlarms);
    console.log('Test alarms created:', result);
  } catch (error) {
    console.error('Error creating test alarms:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

// Run the function
createTestAlarms();
