const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
const keys = require('./config/keys');
require('./models/Bike');
require('./services/cloudinary');

const app = express();

mongoose.connect(keys.mongoURI);

app.use(bodyParser.json());

require('./routes/bikeRoutes')(app);
require('./routes/imageRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
