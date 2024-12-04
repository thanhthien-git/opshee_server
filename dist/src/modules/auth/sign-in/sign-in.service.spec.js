"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sign_in_service_1 = require("./sign-in.service");
describe('SignInService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [sign_in_service_1.SignInService],
        }).compile();
        service = module.get(sign_in_service_1.SignInService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=sign-in.service.spec.js.map