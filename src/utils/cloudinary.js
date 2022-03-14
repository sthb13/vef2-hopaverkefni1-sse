import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import util from 'util';

dotenv.config();

const uploadAsync = util.promisify(cloudinary.uploader.upload);

export async function uploadImage(filepath) {
  return uploadAsync(filepath);
}

export async function getURLForCloudinary(img) {
  let url;
  try {
    const uploadResult = await uploadImage(img);
    // console.log(uploadResult);
    if (!uploadResult || !uploadResult.secure_url) {
      throw new Error('no secure_url from cloudinary upload');
    }
    url = uploadResult.secure_url;

  } catch (e) {

    return null
  }
  return url;
}
