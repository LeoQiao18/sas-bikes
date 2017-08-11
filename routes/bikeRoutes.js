const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

const Bike = mongoose.model('bikes');

module.exports = app => {
  app.get('/api/bikes', async (req, res) => {
    const bikes = await Bike.find({});
    res.send(bikes);
  });

  app.post('/api/bikes', async (req, res) => {
    const {
      firstName,
      lastName,
      color,
      brand,
      description,
      cloudinary_public_id,
      image_url
    } = req.body;

    const bike = await new Bike({
      owner: { firstName, lastName },
      color,
      brand,
      description,
      image_url,
      cloudinary_public_id
    }).save();

    if (!bike.description) {
      bike.description = '';
    }

    res.send(bike);
  });

  app.delete('/api/bikes/:id', (req, res) => {
    console.log(req.params.id);
    Bike.findByIdAndRemove(req.params.id, (err, bike) => {
      cloudinary.v2.uploader.destroy(
        bike.cloudinary_public_id,
        (err, result) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).send(bike);
          }
        }
      );
    });
  });
};
