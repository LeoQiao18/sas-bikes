const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/Bike');

const app = express();

mongoose.connect(keys.mongoURI);

app.use(bodyParser.json());

require('./routes/bikeRoutes')(app);

app.get('/', (req, res) => {
  res.send('HI BIKE APP!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
