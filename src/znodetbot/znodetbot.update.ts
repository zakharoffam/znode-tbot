import { Update, Ctx, Sender, Start, Help, On, Message } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class ZNodeTBotUpdate {
  @Start()
  private async onStart(@Ctx() ctx: Context, @Sender() sender): Promise<void> {
    console.log(sender);
    await ctx.reply('Привет! 😀');
  }

  @Help()
  private async help(@Ctx() ctx: Context, @Sender() sender) {
    console.log(sender);
    await ctx.reply('Сейчас расскажу тебе такое...');
  }

  @On('message')
  private async onMessage(
    @Ctx() ctx: Context,
    @Sender() sender,
    @Message() message,
  ) {
    console.log(message);
  }
}
