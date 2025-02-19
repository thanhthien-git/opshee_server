"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptService = void 0;
const bcrypt = require("bcrypt");
class BcryptService {
    static async encryptString(text) {
        const saltRounds = 10;
        return await bcrypt.hash(text, saltRounds);
    }
    static async comparePassword(current, hashed) {
        return await bcrypt.compare(current, hashed);
    }
}
exports.BcryptService = BcryptService;
