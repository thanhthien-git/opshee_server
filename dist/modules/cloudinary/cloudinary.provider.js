"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = require("../../config/config");
exports.CloudinaryProvider = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        cloudinary_1.v2.config({
            cloud_name: config_1.CONFIG.cloudinary.cloudName,
            api_key: config_1.CONFIG.cloudinary.apiKey,
            api_secret: config_1.CONFIG.cloudinary.apiSecret,
        });
        return cloudinary_1.v2;
    },
};
