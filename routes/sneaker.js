const express = require('express')
const {auth} = require('./../middleware/auth')
const router = express.Router()
const {sneakerModel, usersModel} = require('../models')
const sneakerSeeder = require('../seeder/sneakers.json')
const {getToken, getTokenData} = require('../config/jwt.config')

//router.use(auth)

router.get('/seeder',async(req,res)=>{
  try {
    const data = await sneakerModel.create(sneakerSeeder)
    res.send({
      length: data.length,
      createdSneaker: data
    })
  } catch (error) {
    res.send(error)
  }
})

router.get('/',async(req,res)=>{
  const data = await sneakerModel.find({})
  res.send({
    length: data.length,
    sneakers: data,
  })
})

router.get('/men/:pag', async(req, res) => {
  try {
    const pag = Number(req.params.pag) && Number(req.params.pag) >=1 ? Number(req.params.pag) - 1 : 0
    const registrospp = 3 //cantidad de registros por pagina
    const numberOfPages = await sneakerModel.find({genre: 'Men'})
    const sneakerPage = await sneakerModel.find({genre: 'Men'}).skip(pag * registrospp).limit(registrospp)
    res.send({
      genre: 'men',
      numberOfPages: Math.ceil(numberOfPages.length / registrospp),
      page: Number(pag) + 1,
      lengthOfSneakers: sneakerPage.length,
      sneakers: sneakerPage
    }) 
  } catch (error) {
    res.send({error})
  }
})

router.get('/women/:pag', async(req, res) => {
  try {
    const pag = Number(req.params.pag) && Number(req.params.pag) >=1 ? Number(req.params.pag) - 1 : 0
    const registrospp = 3 //cantidad de registros por pagina
    const numberOfPages = await sneakerModel.find({genre: 'Women'})
    const sneakerPage = await sneakerModel.find({genre: 'Women'}).skip(pag * registrospp).limit(registrospp)
    res.send({
      genre: 'women',
      numberOfPages: Math.ceil(numberOfPages.length / registrospp),
      page: Number(pag) + 1,
      lengthOfSneakers: sneakerPage.length,
      sneakers: sneakerPage
    }) 
  } catch (error) {
    res.send({error})
  }
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
    res.send({createdSneaker:data})
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

router.delete('/:id',async(req,res)=>{
  try {
    let {id} = req.params
    const data = await sneakerModel.findByIdAndDelete(id)
    res.send({message:'sneaker deleted',sneaker:data})
  } catch (error) {
    res.send({error})
  }
})

module.exports = router