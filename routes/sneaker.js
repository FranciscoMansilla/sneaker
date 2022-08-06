const express = require('express')
const router = express.Router()
const {sneakerModel} = require('../models')

router.get('/',async(req,res)=>{
  const data = await sneakerModel.find({})
  res.send({sneakers:data})
})
router.get('/:id',async(req,res)=>{
  try {
    let {id} = req.params
    const data = await sneakerModel.findById(id)
    res.send({sneaker:data})
  } catch (error) {
    res.send({error})
  }
})
router.post('/',async(req,res)=>{
  const {body} = req
  try {
    const data = await sneakerModel.create(body)
    res.send({createdUser:data})
  } catch (error) {
    res.send(error)
  }
})
router.delete('/all',async(req,res)=>{
  try {
    const data = await sneakerModel.deleteMany()
    res.send({response:data})
  } catch (error) {
    res.send(error)
  }
})




module.exports = router