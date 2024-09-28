import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});


export const upload_f = (file, folder) => {

  return new Promise((resolve, reject) => {
    
    cloudinary.v2.uploader.upload(
      file,
      console.log('hey'),
      {
       
        resource_type: "auto",
        folder: folder
      },
      
      (error, res) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            public_id: res.public_id,
            url: res.url
          });
        }
      }
    );
  });
};

export const delete_f = async (file) => {
  const res = await cloudinary.v2.uploader.destroy(file);
  return res?.result === 'ok';
};
