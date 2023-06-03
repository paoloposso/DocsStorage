require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseFormatInterceptor } from './application/interceptors/response-format-interceptor';
import { ErrorInterceptor } from './application/interceptors/error-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ErrorInterceptor())
      .useGlobalInterceptors(new ResponseFormatInterceptor());
  
  await app.listen(3000);
}
bootstrap();
