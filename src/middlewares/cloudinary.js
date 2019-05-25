import cloudinary from '../config/cloudinary.config';

const cloudinaryUpload = async(req, res, next) => {
  await cloudinary.v2.uploader.upload(req.files[0].path, (error, result) => {
    req.body.imageUrl = result.url;
    
   });
  
  return next();
};

export default cloudinaryUpload;

