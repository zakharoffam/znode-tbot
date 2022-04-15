import { Injectable } from '@nestjs/common';
import { Start, Ctx, Sender } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Injectable()
export class ZNodeTBotUpdate {
  @Start()
  private async onStart(@Ctx() ctx: Context, @Sender() sender): Promise<void> {
    console.log(ctx);
    console.log(sender);
    await ctx.reply('Привет!');
  }
}
