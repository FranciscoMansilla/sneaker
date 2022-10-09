const jwt = require('jsonwebtoken')
const privateKey = 'contraseasecreta'

const getToken = (payload) =>{
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: payload
  }, privateKey)
}

const getTokenData = (token) =>{
  let data = null
  jwt.verify(
    token,
    privateKey,
    (err, decoded) => {
      if(err) {
        console.log('Error al obtener data del token', err)
      } else {
        data = decoded
      }
    }
  )
  return data;
}
module.exports = {
  getToken,
  getTokenData
}