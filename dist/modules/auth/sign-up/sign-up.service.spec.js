"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sign_up_service_1 = require("./sign-up.service");
describe('SignUpService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [sign_up_service_1.SignUpService],
        }).compile();
        service = module.get(sign_up_service_1.SignUpService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
