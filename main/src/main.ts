import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'main_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  // app.setGlobalPrefix('/v1/api');
  // app.enableCors({
  //   origin: 'http://localhost:4200',
  // });
  // await app.listen(8001);
  await app.listen();
}
bootstrap();
