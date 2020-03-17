import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestMicroservice } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap(): Promise<void> {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.MQTT,
      options: {
        host: '127.0.0.1',
        port: 1883
      },
    },
  );
  await app.listen(() => console.log('Microservice is listening'));
}

bootstrap();
