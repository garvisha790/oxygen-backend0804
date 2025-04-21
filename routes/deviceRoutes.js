const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
<<<<<<< HEAD
 
// ✅ GET all devices (optionally filter by plantId)
=======

// GET devices (with optional plantId filter)
>>>>>>> 4afd72803bc02df8bd9a2bdabbed18b96955b4bb
router.get('/', async (req, res) => {
  try {
    const { plantId } = req.query;
    const devices = plantId
      ? await Device.find({ plantId })
      : await Device.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
<<<<<<< HEAD
 
// ✅ GET parent devices for a site
router.get('/parents', async (req, res) => {
  try {
    const { plantId } = req.query;
    if (!plantId) {
      return res.status(400).json({ message: 'Missing plantId in query' });
    }
 
    const parentDevices = await Device.find({ plantId, parentDeviceId: null }); // 👈 only top-level devices
    res.json(parentDevices);
  } catch (error) {
    console.error('Error fetching parent devices:', error);
    res.status(500).json({ message: 'Server error while fetching parent devices' });
  }
});
 
// ✅ NEW: Get child devices for a parent
router.get('/:parentId/children', async (req, res) => {
  try {
    const { parentId } = req.params;
    const children = await Device.find({ parentDeviceId: parentId });
    res.json(children);
  } catch (error) {
    console.error('Error fetching child devices:', error);
    res.status(500).json({ message: 'Server error while fetching child devices' });
  }
});
 
// ✅ POST - Add a new device (parentDeviceId can be null or device _id)
=======

// POST (Add) a device
>>>>>>> 4afd72803bc02df8bd9a2bdabbed18b96955b4bb
router.post('/', async (req, res) => {
  try {
    const newDevice = new Device(req.body);
    await newDevice.save();
    res.status(201).json(newDevice);
  } catch (error) {
<<<<<<< HEAD
    console.error('Error adding device:', error);
    res.status(400).json({ message: 'Error adding device' });
  }
});
 
// ✅ PUT - Edit a device
router.put('/:id', async (req, res) => {
  try {
    const updatedDevice = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDevice);
  } catch (error) {
    console.error('Error updating device:', error);
    res.status(400).json({ message: 'Error updating device' });
  }
});
 
// ✅ DELETE - Remove a device
=======
    res.status(400).json({ message: 'Error adding device' });
  }
});

// DELETE a device
>>>>>>> 4afd72803bc02df8bd9a2bdabbed18b96955b4bb
router.delete('/:id', async (req, res) => {
  try {
    await Device.findByIdAndDelete(req.params.id);
    res.json({ message: 'Device deleted' });
  } catch (error) {
<<<<<<< HEAD
    console.error('Error deleting device:', error);
    res.status(500).json({ message: 'Error deleting device' });
  }
});
 
=======
    res.status(500).json({ message: 'Error deleting device' });
  }
});

>>>>>>> 4afd72803bc02df8bd9a2bdabbed18b96955b4bb
module.exports = router;