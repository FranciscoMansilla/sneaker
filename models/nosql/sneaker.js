const mongoose = require('mongoose')

const SneakerScheme = new mongoose.Schema(
  {
    id:{
      type: mongoose.Types.ObjectId
    },
    name:{
      type:String,
    },
    price:{
      type:Number,
    },
    description:{
      type:String,
    },
    brand:{
      type:String
    },
    img:{
      type:[String],
    },
    stock:{
      t8:{type:Number},
      t8_5:{type:Number},
      t9:{type:Number},
      t9_5:{type:Number},
      t10:{type:Number},
      t10_5:{type:Number},
      t11:{type:Number},
      t11_5:{type:Number},
      t12:{type:Number},
      t13:{type:Number},
    },
  },
  {
    timestamps:true,
    versionKey:false
  }
);

module.exports = mongoose.model("sneakers", SneakerScheme)