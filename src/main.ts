import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(':tenant?/api');
  // La uso para poner @Exclude en entities para el response
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));


  await app.listen(process.env.PORT || AppModule.port);
}
bootstrap();
