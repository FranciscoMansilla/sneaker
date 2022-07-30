const express = require('express')
const router = express.Router()
const {usersModel} = require('../models')

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
router.post('/',async(req,res)=>{
  const {body} = req
  try {
    const data = await usersModel.create(body)
    res.send({createdUser:data})
  } catch (error) {
    res.send(error)
  }
})




module.exports = router