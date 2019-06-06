import '@babel/polyfill';
import cloudinary from '../config/cloudinary.config';

const cloudinaryUpload = async (req, res, next) => {

  try {
    await cloudinary.v2.uploader.upload(req.files[0].path, (error, result) => {
      req.body.imageUrl = result.url;

    });
  } catch (err) {
    console.log(err);
  }

  return next();
};

export default cloudinaryUpload;

