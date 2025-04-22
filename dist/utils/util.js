"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const crypto = require("crypto");
class Utils {
    static generateBigInt() {
        const buffer = crypto.randomBytes(8);
        return BigInt('0x' + buffer.toString('hex'));
    }
}
exports.Utils = Utils;
