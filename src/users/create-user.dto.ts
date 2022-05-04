export class CreateUserDto {
  id: number;
  is_bot: boolean;
  first_name: string | null;
  last_name: string | null;
  username: string;
  language_code: string;
}
