import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

config();

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Documentation
  const config = new DocumentBuilder()
    .setTitle('Riders CRUD API Documentation')
    .setDescription('The very basic CRUD restful api with nestjs framework')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  //Listening on the port server
  await app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🔥`);
  });
}
bootstrap();
