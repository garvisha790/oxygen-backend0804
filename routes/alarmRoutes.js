const express = require('express');
const Alarm = require('../models/alarmModel');

const router = express.Router();

const alarmController = require('../controllers/alarmController');
 
// Get all alarms

router.get('/', async (req, res) => {
    try {
      const { fromDate, toDate, sortBy, sortOrder = 'desc' } = req.query;
      
      console.log('Fetching alarms from oxygen_monitor database...');
      console.log('Query params:', { fromDate, toDate, sortBy, sortOrder });
      
      let query = {};
      
      // Add date range filter if provided
      if (fromDate || toDate) {
        query.CreatedTimestamp = {};
        if (fromDate) query.CreatedTimestamp.$gte = new Date(fromDate);
        if (toDate) query.CreatedTimestamp.$lte = new Date(toDate);
      }
      
      // Build sort object
      const sortObj = {};
      if (sortBy) {
        sortObj[sortBy] = sortOrder === 'asc' ? 1 : -1;
      } else {
        sortObj.CreatedTimestamp = -1; // Default sort by creation time desc
      }
      
      const alarms = await Alarm.find(query)
        .sort(sortObj)
        .lean();
      
      console.log(`Found ${alarms.length} alarms in oxygen_monitor database`);
      if (alarms.length > 0) {
        console.log('Sample alarm:', JSON.stringify(alarms[0], null, 2));
      }
      
      res.status(200).json(alarms);
    } catch (error) {
      console.error('❌ Error fetching alarms:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });
 
// Get alarms by device ID

router.get('/device/:deviceId', alarmController.getAlarmsByDevice);
 
// Get unread alarms count

router.get('/unread/count', alarmController.getUnreadAlarmsCount);
 
// Mark alarm as read

router.put('/:alarmId/read', alarmController.markAlarmAsRead);
 
// Mark all alarms as read

router.put('/read/all', alarmController.markAllAlarmsAsRead);
 
module.exports = router;
 