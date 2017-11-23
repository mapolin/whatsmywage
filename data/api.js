const express = require('express')
const Wage = require('./model').Wage
const Countries = require('./model').Countries
const base = require('./mock.json')

const API = {
  getAll: () => {
    return Wage.find({})
  },
  getBase: () => {
    return base.data
  },
  save: ({country, city, wage}) => {
    let w = new Wage({
      country: country,
      city: city,
      wage: wage
    })
    return w.save()
  },
  batchInsert: () => {
    for(let i = 0; i < 100; i++) {
      API.save({
        country: Countries[Math.floor(Math.random() * Countries.length)],
        city: 'Some city',
        wage: Math.floor(Math.random() * 10000)
      })
    }
  }
}

module.exports = API
