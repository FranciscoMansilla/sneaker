const { model } = require("mongoose")

const models = {
  usersModel: require('./nosql/users'),
  sneakerModel: require('./nosql/sneaker')

}

module.exports = models