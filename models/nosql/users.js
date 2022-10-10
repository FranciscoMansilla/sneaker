const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const UserScheme = new mongoose.Schema(
  {
    email:{
      type:String,
      required: true,
      unique: true
    },
    password:{
      type: String,
      required: true
    },
    role:{
      type: String,
      default: "user"
    },
    code:{
      type:String,
      required: true,
    },
    name:{
      type:String,
      required: true,
    },
    age:{
      type:Number
    },
  },
  {
    timestamps:true,
    versionKey:false
  }
);

UserScheme.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
      if (err) return next(err)
      this.password = hashedPassword
      next()
    })
  }
});

UserScheme.methods.comparePassword = async function(password){
  if(!password) throw new Error('Password is miss can not compare!')
  try {
    const result = await bcrypt.compare(password, this.password)
    return result
  } catch (error) {
    console.log('Error while comparing password!', error.message)
  }
}

module.exports = mongoose.model("users", UserScheme)