const db = require('../db/db.js');
const express = require('express');
const router = express.Router();

//Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// Define the index page route
router.get('/', (req, res) => {
	res.status(200).send({
		success: 'true',
		message: 'datas retrieved successfully',
		datas: db
	})
	// res.send('Main Page');
});

// Define the home page
router.get('/list', (req, res) => {
	// console.log('Hi');
    // res.render('index.ejs', {
    //     page: "pages/list"
    // });
    res.send('Get the list');
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