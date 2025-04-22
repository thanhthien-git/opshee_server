"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const stocks_service_1 = require("./stocks.service");
describe('StocksService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [stocks_service_1.StocksService],
        }).compile();
        service = module.get(stocks_service_1.StocksService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
