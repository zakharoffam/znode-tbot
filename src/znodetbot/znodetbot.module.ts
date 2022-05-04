import { Module } from '@nestjs/common';
import { ZNodeTBotUpdate } from './znodetbot.update';
import { TelegrafModule } from 'nestjs-telegraf';
import { ZNodeTBotSessionMiddleware } from './znodetbot-session.middleware';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: 'ZNodeTBot',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TOKEN'),
        middlewares: [ZNodeTBotSessionMiddleware],
      }),
    }),
  ],
  providers: [ZNodeTBotUpdate, UsersService],
})
export class ZNodeTBotModule {}
