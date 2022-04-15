import { Module } from '@nestjs/common';
import { ZNodeTBotUpdate } from './znodetbot.update';
import { TelegrafModule } from 'nestjs-telegraf';
import { ZNodeTBotSessionMiddleware } from './znodetbot-session.middleware';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: 'ZNodeTBot',
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('TOKEN'),
        middlewares: [ZNodeTBotSessionMiddleware],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ZNodeTBotUpdate],
})
export class ZNodeTBotModule {}
