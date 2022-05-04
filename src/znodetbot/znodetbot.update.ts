import { Update, Ctx, Start, Help, On } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { UpdateLogEntity } from '../storage/entities/update-log.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/create-user.dto';

@Update()
export class ZNodeTBotUpdate {
  constructor(private readonly usersService: UsersService) {}

  private users = {};

  @Start()
  private async onStart(@Ctx() ctx: Context): Promise<void> {
    let user = await this.usersService.findUserById(ctx.from.id);
    if (!user) {
      user = await this.usersService.createUser(ctx.from as CreateUserDto);
    }
    await UpdateLogEntity.addRecord(`onStart: ${JSON.stringify(user)}`);
    await ctx.reply('Привет! 😀');
  }

  @Help()
  private async onHelp(@Ctx() ctx: Context) {
    let user = await this.usersService.findUserById(ctx.from.id);
    if (!user) {
      user = await this.usersService.createUser(ctx.from as CreateUserDto);
    }
    await UpdateLogEntity.addRecord(`onHelp: ${JSON.stringify(user)}`);
    await ctx.reply('Сейчас расскажу тебе такое...');
  }

  @On('new_chat_members')
  private async onNewChatMembers(@Ctx() ctx: Context) {
    let user = await this.usersService.findUserById(ctx.from.id);
    if (!user) {
      user = await this.usersService.createUser(ctx.from as CreateUserDto);
    }
    await UpdateLogEntity.addRecord(`onNewChatMembers: ${JSON.stringify(user)}`);
    await ctx.reply(`${user.firstName || user.lastName || user.username}, добро пожаловать к нам в ${ctx.chat['title']}.`);
  }

  @On('message')
  private async onMessage(@Ctx() ctx: Context) {
    const user = await this.usersService.findUserById(ctx.from.id);
    if (!user) {
      await this.usersService.createUser(ctx.from as CreateUserDto);
    }
    await UpdateLogEntity.addRecord(`onMessage: ${JSON.stringify(ctx.message)}`);
    if (ctx.chat.id === -1001562141351) {
      if (!this.users[ctx.from.id]) {
        this.users[ctx.from.id] = 1;
      } else {
        ++this.users[ctx.from.id];
      }
      const countString = String(this.users[ctx.from.id]);
      if (countString[countString.length - 1] === '0') {
        await ctx.telegram.sendMessage(
          -1001562141351,
          `${ctx.from.first_name || ctx.from.last_name || ctx.from.username}, предупреждаю тебя ${countString[0]} раз, хватит тут спамить, иди работай.`,
          { reply_to_message_id: ctx.message.message_id },
        );
      }
    }
  }
}
