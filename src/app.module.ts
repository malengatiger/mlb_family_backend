import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseAdmin } from './utils/firebase_util';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FirebaseAdmin],
})
export class AppModule {}
