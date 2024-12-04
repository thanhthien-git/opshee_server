"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_DATABASE = void 0;
const config_1 = require("@nestjs/config");
exports.CONFIG_DATABASE = {
    load_env: config_1.ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
    }),
};
//# sourceMappingURL=config.js.map