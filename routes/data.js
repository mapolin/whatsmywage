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

router.post('/add', (req, res, next) => {
  API.save({
    country: req.body.country,
    city: req.body.city,
    wage: req.body.wage
  }).then(data => {
    res.send(data)
    res.end()
  }).catch(err => {
    res.send(err)
    res.end()
  })
})

module.exports = router
