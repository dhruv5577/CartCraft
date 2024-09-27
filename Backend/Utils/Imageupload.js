import cloudinary from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config();

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  cloud_api_key:process.env.CLOUDINARY_API_KEY,
  cloud_api_secret_key:process.env.CLOUDINARY_API_SECRET_KEY,
});

export const upload_f=(file,folder)=>{
  return new Promise((resolve,reject)=>{
    cloudinary.v2.uploader.upload(
      file,
      (res)=>{
        resolve({
          public_id:res.public_id,
          url:res.url
        })
      },
      {
        resource_type:"auto",
        folder
      }
    )
  })
}


export const delete_f=async (file)=>{
  const res=await cloudinary.uploader.destroy(file);

  if(res?.result==='ok') return true;
}