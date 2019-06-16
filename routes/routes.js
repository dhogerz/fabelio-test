const db = require('../db/db.js');
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();

//Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

const getBreeds = () => {
  try {
    return axios.get('https://fabelio.com/ip/mondy-chair-3975.html')
  } catch (error) {
    console.error(error)
  }
}

const countBreeds = async () => {
  const breeds = getBreeds()
    .then(response => {
      if (response.data.message) {
        console.log(
          `Got ${Object.entries(response.data.message).length} breeds`
        )
      }
    })
    .catch(error => {
      console.log(error)
    })
}

// Define the index page route
router.get('/', (req, res) => {
    // https://fabelio.com/ip/mondy-chair-3975.html
    countBreeds();
    res.status(200).send({
        success: 'true',
        message: 'datas retrieved successfully',
        datas: countBreeds()
    })
});

// Define the home page
router.get('/list', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'datas retrieved successfully',
        datas: db
    })
});

// Define the home page
router.get('/product', (req, res) => {
	// console.log('Hi');
    // res.render('index.ejs', {
    //     page: "pages/list"
    // });
    res.send('Get the product');
});

module.exports = router;