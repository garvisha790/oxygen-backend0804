<<<<<<< HEAD
//usermodel is 
const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema({

  name: { 

    type: String, 

    required: true 

  },

  email: { 

    type: String, 

    required: true, 

    unique: true,

    trim: true,

    lowercase: true

  },

  password: { 

    type: String, 

    required: true 

  },

  createdAt: {

    type: Date,

    default: Date.now

  }

});
 
module.exports = mongoose.model('User', userSchema);
 
=======
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
>>>>>>> 4afd72803bc02df8bd9a2bdabbed18b96955b4bb
