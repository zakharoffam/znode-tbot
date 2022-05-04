import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ZNodeTBotModule } from './znodetbot/znodetbot.module';
import { StorageModule } from './storage/storage.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StorageModule,
    ScheduleModule.forRoot(),
    UsersModule,
    ZNodeTBotModule,
  ],
})
export class AppModule {}
