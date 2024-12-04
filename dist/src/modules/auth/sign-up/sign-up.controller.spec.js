"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sign_up_controller_1 = require("./sign-up.controller");
describe('SignUpController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [sign_up_controller_1.SignUpController],
        }).compile();
        controller = module.get(sign_up_controller_1.SignUpController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=sign-up.controller.spec.js.map