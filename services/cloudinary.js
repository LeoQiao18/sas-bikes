const cloudinary = require('cloudinary');
const {
  cloudinaryCloudName,
  cloudinaryAPIKey,
  cloudinaryAPISecret
} = require('../config/keys');

cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryAPIKey,
  api_secret: cloudinaryAPISecret
});
