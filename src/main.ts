import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MyUtils } from './utils/my-utils';
import * as os from 'os';

const mm = '🔵 🔵 🔵 🔵 🔵 🔵 MLB Family Archive 🔵 🔵';
const env = process.env.NODE_ENV;
Logger.log(`${mm} NODE_ENV : ${env}`);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = MyUtils.getPort();
  Logger.log(`${mm} ... running on port : ${port} `);
  // Get Server IP Address
  const interfaces = os.networkInterfaces();
  let serverIP = '127.0.0.1'; // Default to localhost

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        serverIP = iface.address;
        break; // Use the first available external IPv4 address
      }
    }
  }

  Logger.log(`\n${mm} ...🔆  running on: http://${serverIP}:${port}`);

  app.setGlobalPrefix('api/v1');

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('KasieTransie Backend')
    .setDescription('The Family Archive API manages the backend data ')
    .setVersion('1.0')
    .addTag('taxis')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/api', app, document);
  Logger.log(`${mm} ... Swagger set up .....`);
  // app.use(helmet());
  app.enableCors();
  Logger.log(`${mm} ... CORS set up .....`);

  await app.listen(port);
}
bootstrap();
