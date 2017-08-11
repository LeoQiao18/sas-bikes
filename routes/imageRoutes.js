const cloudinary = require('cloudinary');
const Datauri = require('datauri');
const multer = require('multer');
const upload = multer({});

module.exports = app => {
  app.post('/api/images', upload.single('file'), (req, res) => {
    const datauri = new Datauri();
    datauri.format('.png', req.file.buffer);
    cloudinary.v2.uploader.upload(
      datauri.content,
      { folder: 'sas_bikes_dev' },
      (err, result) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send(result);
        }
      }
    );
  });

  app.delete('/api/images/:folder/:public_id', (req, res) => {
    const { folder, public_id } = req.params;
    cloudinary.v2.uploader.destroy(`${folder}/${public_id}`, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });
};
