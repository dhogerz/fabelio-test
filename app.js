const express = require('express');
const app = express();
const http = require('http').Server(app);

const bodyParser = require('body-parser')

const middlewares = [
  express.static(__dirname + '/public'),
  bodyParser.urlencoded({extended: false})
]

// Set up mongoose connection
const mongoose = require('mongoose');
const dev_db_url = "mongodb+srv://fyulistian:okedeh13.@cluster-wekko.mongodb.net/fabelio-online-test?retryWrites=true&w=majority";
const mongoDB = dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// npm cache clean --force 
// rm -rf node_modules
// rm -rf package-lock.json 
// npm install

// internal
const routes = require('./routes/routes.js');
const PORT = 8080;

// view engine
app.set('view engine', 'ejs');

// use public
app.use(middlewares);

// Routes
app.use('/', routes);

// 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

// 500
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


// listen server
const server = http.listen(PORT, function() {
    console.log(`listening on *:${PORT}`);
});