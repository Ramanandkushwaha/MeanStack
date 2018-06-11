const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path'); 
const router = express.Router();
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Could NOT connect to database: ', err);
  } else {
    //console.log(config.secret);  
    console.log('Connected to database: ' + config.db);
  }
});

app.use(cors({
  origin: 'http://169.62.133.41:4200'
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// Provide static directory for frontend
app.use(express.static(__dirname + '/client/dist/client'));
app.use('/authentication', authentication);

// Connect server to Angular Index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});
app.listen(8080, () => {
    console.log('Listening on Port 8080')
});