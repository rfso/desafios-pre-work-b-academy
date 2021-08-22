const express = require('express')
const router = express.Router()
let data = {}

router.get('/', (req, res) => {
  res.json(Object.values(data))
})

function checkBody (req, res, next) {
  if (areAllFieldsValid(req.body)) {
    return next()
  }

  res.status(400).json({ error: true, message: 'All fields needs to be filled.' })
}

function areAllFieldsValid (body) {
  const fields = [body.image, body.brandModel, body.year, body.plate, body.color]
  return fields.every(field => typeof field !== 'undefined' && field !== '')
}

function checkAlreadyRegistered (req, res, next) {
  if (typeof data[req.body.plate.toUpperCase()] !== 'undefined') {
    return res.status(400).json({ 
      error: true, 
      message: `There is already a car registered with this license plate: ${req.body.plate}.` 
    })
  }
  next()
}

router.post('/', checkBody, checkAlreadyRegistered, (req, res) => {
  data[req.body.plate.toUpperCase()] = {
    image: req.body.image,
    brandModel: req.body.brandModel,
    year: req.body.year,
    plate: req.body.plate,
    color: req.body.color
  }

  res.json({ message: `The car that has the license plate ${req.body.plate} was successfully registered.` })
})

router.delete('/', (req, res) => {
  delete data[req.body.plate.toUpperCase()]
  res.json({ message: `The car that has the license plate ${req.body.plate} was successfully removed.` })
})

module.exports = router
