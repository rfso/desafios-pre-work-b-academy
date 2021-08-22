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

  res.status(400).json({ error: true, message: 'Todos os campos são obrigatórios' })
}

function areAllFieldsValid (body) {
  const fields = [body.carImage, body.carBrand, body.carYear, body.carPlate, body.carColor]
  return fields.every(field => typeof field !== 'undefined' && field !== '')
}

function checkAlreadyRegistered (req, res, next) {
  if (typeof data[req.body.carPlate.toUpperCase()] !== 'undefined') {
    return res.status(400).json({ 
      error: true, 
      message: `Já existe um carro cadastrado com a placa ${req.body.carPlate}` 
    })
  }
  next()
}

router.post('/', checkBody, checkAlreadyRegistered, (req, res) => {
  data[req.body.carPlate.toUpperCase()] = {
    carImage: req.body.carImage,
    carBrand: req.body.carBrand,
    carYear: req.body.carYear,
    carPlate: req.body.carPlate,
    carColor: req.body.carColor
  }

  res.json({ message: `O carro com placa ${req.body.carPlate} foi cadastrado com sucesso` })
})

router.delete('/', (req, res) => {
  delete data[req.body.carPlate.toUpperCase()]
  res.json({ message: `O carro com placa ${req.body.carPlate} foi removido com sucesso` })
})

module.exports = router
