import { Update, Ctx, Sender, Start, Help, On } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class ZNodeTBotUpdate {
  private users = {};

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

  @On('new_chat_members')
  private async onNewChatMembers(@Ctx() ctx: Context) {
    console.log(ctx);
  }

  @On('message')
  private async onMessage(@Ctx() ctx: Context) {
    if (ctx.chat.id === -1001562141351) {
      if (!this.users[ctx.from.id]) {
        this.users[ctx.from.id] = 1;
      } else {
        ++this.users[ctx.from.id];
      }
      console.log(this.users);
      const countString = String(this.users[ctx.from.id]);
      if (countString[countString.length - 1] === '0') {
        await ctx.telegram.sendMessage(
          -1001562141351,
          `${
            ctx.from.first_name || ctx.from.last_name || ctx.from.username
          }, предупреждаю тебя ${
            countString[0]
          } раз, хватит тут спамить, иди работай.`,
          { reply_to_message_id: ctx.message.message_id },
        );
      }
    }
  }
}
