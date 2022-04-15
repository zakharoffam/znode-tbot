import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ZNodeTBotModule } from './znodetbot/znodetbot.module';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(), ZNodeTBotModule],
})
export class AppModule {}
