const mongoose = require('mongoose');
<<<<<<< HEAD
 
=======

>>>>>>> 4afd72803bc02df8bd9a2bdabbed18b96955b4bb
const deviceSchema = new mongoose.Schema({
  deviceName: { type: String, required: true },
  serialNumber: { type: String, required: true },
  macId: { type: String, required: true },
  commissionedDate: { type: Date, required: true },
  plantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant', required: true },
<<<<<<< HEAD
  parentDeviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', default: null }, // 👈 NEW FIELD
});
 
const Device = mongoose.model('Device', deviceSchema);
 
=======
});

const Device = mongoose.model('Device', deviceSchema);

>>>>>>> 4afd72803bc02df8bd9a2bdabbed18b96955b4bb
module.exports = Device;