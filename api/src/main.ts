import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3400;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: { target: false, value: false },
      forbidUnknownValues: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Student Demo Test')
    .setDescription('This documents all the endpoints used for this demo test')
    .setVersion('1.0')
    .setBasePath('/api')
    .addTag('Students')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
}
bootstrap();
