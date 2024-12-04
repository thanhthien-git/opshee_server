import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
      serveStaticOptions: {
        cacheControl: true,
        maxAge: 43200000,
        immutable: true,
      },
    }),
  ],
})
export class AppModule {}
