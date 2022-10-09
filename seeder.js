require('colors')
require('dotenv').config()
const mongoose = require('mongoose')
// const dotenv = require('dotenv')
const fs = require('fs')

// load env variables
// dotenv.config({path: './.env'})

// load Models
const {sneakerModel} = require('./models')


// Db Connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  UseCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

//Read JSON files

const sneakers = JSON.parse(
  fs.readFileSync(`${__dirname}/seeder/sneakers.json`, 'utf-8')
);

//populate data to DB
const importData = async () => {
  try {
    // const data = await sneakerModel.insertMany(sneakers)
    // console.log(data, 'Data Imported'.green.inverse)
    sneakers.map(async(s)=> await sneakerModel.create(s))
    process.exit()
  } catch (e){
    console.error(e)
  }
}

//delete data to DB
const deleteData = async () => {
  try {
    sneakerModel.deleteMany()
    console.log('Data Deleted'.red.inverse)
    process.exit()
  } catch (e){
    console.error(e)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-g') {
  deleteData()
}
