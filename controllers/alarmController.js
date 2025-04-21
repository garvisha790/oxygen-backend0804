const Alarm = require('../models/alarmModel'); // Now pointing to oxygen_monitor DB
const Device = require('../models/Device');
const { fetchAlarmsFromCosmos } = require('../services/cosmosService');

console.log("Alarm model connected to oxygen_monitor DB" , Alarm);
// Get all alarms from oxygen_monitor.alarms
exports.getAllAlarms = async (req, res) => {
  try {
    const alarms = await Alarm.find({}).sort({ CreatedTimestamp: -1 });
    res.status(200).json(alarms);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get alarms by device ID from oxygen_monitor.alarms
exports.getAlarmsByDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;
    let query = {};
    if (deviceId && deviceId !== 'all') {
      query.DeviceId = deviceId;
    }
    const alarms = await Alarm.find(query).sort({ CreatedTimestamp: -1 });
    res.status(200).json(alarms);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get unread alarms count
exports.getUnreadAlarmsCount = async (req, res) => {
  try {
    const count = await Alarm.countDocuments({ IsRead: false });
    res.status(200).json({ count });
  } catch (error) {
    console.error('❌ Error fetching unread alarms count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mark alarm as read
exports.markAlarmAsRead = async (req, res) => {
  try {
    const { alarmId } = req.params;
    const updatedAlarm = await Alarm.findByIdAndUpdate(
      alarmId,
      { IsRead: true },
      { new: true }
    );

    if (!updatedAlarm) {
      return res.status(404).json({ message: 'Alarm not found' });
    }

    res.status(200).json(updatedAlarm);
  } catch (error) {
    console.error(`❌ Error marking alarm ${req.params.alarmId} as read:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mark all alarms as read
exports.markAllAlarmsAsRead = async (req, res) => {
  try {
    await Alarm.updateMany(
      { IsRead: false },
      { IsRead: true }
    );

    res.status(200).json({ message: 'All alarms marked as read' });
  } catch (error) {
    console.error('❌ Error marking all alarms as read:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
