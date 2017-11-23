const mongoose = require('mongoose')

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost/local', { useMongoClient: true })
  .then()
  .catch(err => console.warn(err))

module.exports = mongoose
