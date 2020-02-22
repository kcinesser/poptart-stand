const express = require("express");
const router = express.Router();

require('dotenv').config();

// Load Poptart model
const Poptart = require("../models/poptart.model");

//Get all poptarts
router.route('/').get((req, res) => {
  Poptart.find().sort('flavor')
    .then(poptarts => res.json(poptarts))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Create a new poptart
router.route('/add').post((req, res) => {
  const newPoptart = new Poptart(req.body);

  newPoptart.save()
    .then(() => res.json(newPoptart))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;