const mongoose = require('mongoose')
const package = require('../package.json')
const env = process.env.NODE_ENV || 'development'

mongoose.Promise = require('bluebird')
mongoose.connect(package.config.dbPath[env], { useMongoClient: true })
  .then(result => console.log('\x1b[33m%s', `[Mongo] Connected to ${package.config.dbPath}`))
  .catch(err => console.warn('\x1b[31m%s', `[Mongo] ${err}`))

module.exports = mongoose
