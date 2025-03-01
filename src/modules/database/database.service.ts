import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  getConnectUrl(name: string) {
    return this.configService.get<string>(name);
  }
}
