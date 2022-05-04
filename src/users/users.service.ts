import { Injectable } from '@nestjs/common';
import { UserInterface } from './user.interface';
import { UserEntity } from '../storage/entities/user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  /**
   * Найти пользователя по ID
   * @param userId
   */
  public async findUserById(userId: number): Promise<UserInterface | undefined>{
    const userEntity = await UserEntity.findOne({ where: { id: userId }});
    if (!userEntity) {
      return undefined;
    } else {
      return {
        id: userEntity.id,
        isBot: userEntity.isBot,
        isAdmin: userEntity.isAdmin,
        firstName: userEntity.firstName,
        lastName: userEntity.lastName,
        username: userEntity.username,
        languageCode: userEntity.languageCode,
      };
    }
  }


  /**
   * Создать нового пользователя
   * @param data
   */
  public async createUser(data: CreateUserDto): Promise<UserInterface> {
    let userEntity = await UserEntity.findOne({ where: { id: data.id }});
    if (userEntity) {
      return await this.findUserById(userEntity.id);
    } else {
      userEntity = new UserEntity();
      userEntity.id = data.id;
      userEntity.isBot = data.is_bot;
      userEntity.isAdmin = false;
      userEntity.firstName = data.first_name;
      userEntity.lastName = data.last_name;
      userEntity.username = data.username;
      userEntity.languageCode = data.language_code;
      userEntity = await UserEntity.save(userEntity);
      return await this.findUserById(userEntity.id);
    }
  }
}
