const db = require('../db/db.js');
const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/product.controller.js');

//Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/tests', product_controller.tests);

// Define the index page route
router.get('/', (req, res) => {
    res.render('index.ejs', {
        page: "pages/home"
    });
});

// List page
router.get('/list', product_controller.list);

// Product page
router.get('/product', product_controller.view);

module.exports = router;