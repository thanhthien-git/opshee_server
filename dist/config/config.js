"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = exports.CONFIG_DATABASE = void 0;
const config_1 = require("@nestjs/config");
exports.CONFIG_DATABASE = {
    load_env: config_1.ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
    }),
};
exports.CONFIG = {
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
        url: process.env.REDIS_URL,
        ttl: process.env.REDIS_TTL,
    },
    jwt: process.env.JWT_SECRET,
};
