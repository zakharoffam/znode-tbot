export interface UserInterface {
  id: number;
  isBot: boolean;
  isAdmin: boolean;
  firstName: string | null;
  lastName: string | null;
  username: string;
  languageCode: string;
}
