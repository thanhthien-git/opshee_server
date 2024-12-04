import { ConfigModule } from '@nestjs/config';

export const CONFIG_DATABASE = {
  load_env: ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
};
