const URL = require('url');
const axios = require('axios');
const cheerio = require('cheerio');
const Product = require('../models/product.model.js');

//Simple version, without validation or sanitation
exports.tests = (req, res) => {
    res.send('Greetings !');
};

// view
exports.view = (req, res, next) => {
    let search = req.query['get'];
    	search = URL.parse(search).href;

    axios.get(search)
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                    $ = cheerio.load(html),
                    mainWidget = $('.yotpo-main-widget'),
                    id = mainWidget.data("product-id"),
                    descr = mainWidget.data("description"),
                    name = mainWidget.data("name"),
                    description = $("#description").text(),
                    productUrl = search,
                    price = $("#product-price-" + id).data("price-amount"),
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