const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
  prenom: { 
      type: String, 
      required: true 
    },   
  pseudo: { 
      type: String, 
      required: true 
    },
  email: { 
      type: String, 
      required: true, 
      unique: true 
    },
  password: { 
      type: String, 
      required: true 
    },
  role:{
      type: String,
      enum:['admin','user'],
      default:'user',
    },
  },
  { timestamps: { createdAt: true } }
)
module.exports = mongoose.model('User', UserSchema);