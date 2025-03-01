import { ConfigService } from '@nestjs/config';
export declare class DatabaseConfigService {
    private configService;
    constructor(configService: ConfigService);
    getConnectUrl(name: string): string;
}
