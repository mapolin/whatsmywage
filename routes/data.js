const express = require('express')
const router = express.Router()
const API = require('../data/api')

/* GET home page. */
router.get('/wages', (req, res, next) => {
  API.getAll()
    .then(result => {
      res.send(result).end()
    })
    .catch(err => res.send(err).end())
})

router.get('/wages/base', (req, res, next) => {
  res.send(API.getBase())
  res.end()
})

router.get('/wages/batch', (req, res, next) => {
  API.batchInsert()
  res.end('Inserting data...')
})

router.get('/wages/:country/:city/:wage', (req, res, next) => {
  API.save({
    country: req.params.country,
    city: req.params.city,
    wage: req.params.wage
  }).then(data => {
    res.end(data)
  }).catch(err => {
    res.end(err)
  })
})

module.exports = router
