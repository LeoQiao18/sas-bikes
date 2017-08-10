const mongoose = require('mongoose');

const Bike = mongoose.model('bikes');

module.exports = app => {
  app.get('/api/bikes', async (req, res) => {
    const bikes = await Bike.find({});
    res.send(bikes);
  });

  app.post('/api/bikes', async (req, res) => {
    const { firstName, lastName, color, brand, description } = req.body;

    const bike = await new Bike({
      owner: { firstName, lastName },
      color,
      brand,
      description
    }).save();

    res.send(bike);
  });
};
