require('colors')
const express = require('express')
const router = express.Router()
const {usersModel} = require('../models')
const jwt = require('jsonwebtoken')
const privateKey = 'contraseasecreta'
const { v4: uuidv4 } = require('uuid')
const {getToken, getTokenData} = require('../config/jwt.config')

router.get('/',async(req,res)=>{
  const data = await usersModel.find({})
  res.send({users:data})
})
router.get('/:id',async(req,res)=>{
  try {
    let {id} = req.params
    const data = await usersModel.findById(id)
    res.send({user:data})
  } catch (error) {
    res.send({error})
  }
})

router.post('/login', async(req,res)=>{
  const {email, password} = req.body
  const user = await usersModel.findOne({email})
  if(user){
    const result = await user.comparePassword(password)
    console.log(result, 'resultado'.green.inverse)
    if(result){
      const token = getToken({user: user.email, code:user.code})
      return res.send({
        succes: true,
        msg: 'logueado',
        token
      })
    }
    return res.send({
      succes: false,
      msg: 'Contraseña incorrecta!',
    })
  } else {
    res.send({
      succes: false,
      msg: 'Usuario no registrado!'
    })
  }
    // const token = jwt.sign({
    //   exp: Math.floor(Date.now() / 1000) + (60 * 60),
    //   data: email
    // }, privateKey);
    // res.send({
    //   succes: true,
    //   token
    // })
})

router.post('/register',async(req,res)=>{
  try {
    const {email, name, password} = req.body
    let user = await usersModel.findOne({email}) || null;
    if(user){
      return res.send({
        succes: false,
        msg: 'El usuario ya existe'
      })
    }
    const code = uuidv4()
    const newUser = await usersModel.create({email, password, name, code})
    if(!newUser){
      res.send({
        succes: false,
        msg: 'Error al registrar usuario',
        error: err
      })
    } else {
      const token = getToken({email, code})
      res.send({
        succes: true,
        msg: 'Usuario Registrado!',
        token,
        newUser
      })
    }
  } catch (error) {
    console.log(error)
    res.send({
      succes: false,
      msg: 'Error al registrar',
      error: error
    })
  }
})

router.post('/',async(req,res)=>{
  const {body} = req
  try {
    const data = await usersModel.create(body)
    res.send({createdUser:data})
  } catch (error) {
    res.send(error)
  }
})
router.delete('/all',async(req,res)=>{
  try {
    const data = await usersModel.deleteMany()
    res.send({response:data})
  } catch (error) {
    res.send(error)
  }
})




module.exports = router