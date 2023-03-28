import { User } from '../../../../infrastructure/model/user.entity';

export class LoginResponseDto {
  readonly accessToken: string;
  readonly user: User;
  constructor(accessToken: string, user: User) {
    this.accessToken = accessToken;
    this.user = user;
  }
}
