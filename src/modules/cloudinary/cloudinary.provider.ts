import { Provider } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CONFIG } from '../../config/config';

export const CloudinaryProvider: Provider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    cloudinary.config({
      cloud_name: CONFIG.cloudinary.cloudName,
      api_key: CONFIG.cloudinary.apiKey,
      api_secret: CONFIG.cloudinary.apiSecret,
    });
    return cloudinary;
  },
};
