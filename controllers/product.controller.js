const URL = require('url');
const axios = require('axios');
const cheerio = require('cheerio');
const Product = require('../models/product.model.js');

exports.tests = (req, res) => {
    res.send('Greetings !');
};

// view
exports.view = (req, res, next) => {
    let search = req.query['get'],
    	parsedURL = URL.parse(search),
    	hostname = parsedURL.hostname;
    
    search = parsedURL.href;

    if (hostname === "fabelio.com") {
    	axios.get(search)
    	    .then((response) => {
    	        if (response.status === 200) {
    	            const html = response.data;
    	                $ = cheerio.load(html),
    	                mainWidget = $('.yotpo-main-widget'),
    	                id = mainWidget.data("product-id"),
    	                descr = mainWidget.data("description") || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi maxime voluptatum explicabo aut veniam! Sed cum magni libero reprehenderit, nihil quae dicta quam. Ex atque repudiandae quod porro quos quasi?",
    	                name = mainWidget.data("name"),
    	                description = $("#description").text(),
    	                productUrl = search,
    	                price = $("#product-price-" + id).data("price-amount") || 0,
    	                image = mainWidget.data("image-url");

    	        	// prepare Data
    	            let product = {
    	            	name: name,
    	            	url: search,
    	            	description: descr,
    	            	price: price
    	            };
    	            // Find the product and update
    	            let query = product,
    	                update = product,
    	                options = { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false };
    	            Product.findOneAndUpdate(query, update, options, (error, result) => {
    	                if (error) return next(error);

    	                res.render('index.ejs', {
    	                    page: "pages/product",
    	                    data: {
    	                        id: id,
    	                        descr: descr,
    	                        productUrl: productUrl,
    	                        name: name,
    	                        price: price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    	                        description: description,
    	                        image: image
    	                    }
    	                });
    	            });

    	        } 
    	    })
    	    .catch((err) => {
    	        res.render("index.ejs", {
    	            page: "pages/error",
    	            errMsg: err
    	        });
    	    });
    } else {
    	res.render("index.ejs", {
    	    page: "pages/error",
    	    errMsg: "Error: Request failed hostname !== fabelio.com"
    	});
    }
};

// list
exports.list = (req, res) => {
    Product.find((err, product) => {
        if (err) return next(err);
        res.render("index.ejs", {
            page: "pages/list",
            data: product
        });
    })
};