import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  if(process.env.NODE_ENV !== 'PRODUCTION'){


    const config = new DocumentBuilder().
    setTitle('Staff Manager API').
    setDescription('The Staff Manager API description').
    setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'jwt',
      ).
    build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document,{
      
    });
  }


  await app.listen(3333);
}
bootstrap();
