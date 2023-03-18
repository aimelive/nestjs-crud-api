import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RidersModule } from './restful/riders/riders.module';
import { config } from 'dotenv';

config();

@Module({
  imports: [RidersModule, MongooseModule.forRoot(process.env.MONGO_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
