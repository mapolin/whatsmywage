const mongoose = require('./db')
const countries = require('../src/static/countries.json')
const _ = require('lodash')

const countriesEnum = _.flatMap(countries, (c) => c.value)

const Wage = mongoose.model('Wage', {
  country: {
    type: String,
    required: true,
    enum: countriesEnum
  },
  city: String,
  wage: Number
});

module.exports = {
  Wage: Wage,
  Countries: countriesEnum
}
