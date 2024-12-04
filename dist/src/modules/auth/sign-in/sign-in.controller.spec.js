"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sign_in_controller_1 = require("./sign-in.controller");
describe('SignInController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [sign_in_controller_1.SignInController],
        }).compile();
        controller = module.get(sign_in_controller_1.SignInController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=sign-in.controller.spec.js.map