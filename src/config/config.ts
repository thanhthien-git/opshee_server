import { ConfigModule } from '@nestjs/config';

export const CONFIG_DATABASE = {
  load_env: ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
};

export const CONFIG = {
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  database: {
    postgres: process.env.POSTGRES_URL,
    mongo: process.env.MONGODB_URL,
  },
  nodeMailer: {
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  },
  redis: {
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    ttl: process.env.REDIS_TTL,
  },
  jwt: process.env.JWT_SECRET,
};

