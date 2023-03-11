import {User} from "../../../infrastructure/model/user.entity";

export class LoginResponseDTO {
  constructor(accessToken: string, user: User) {
    this.accessToken = accessToken;
    this.user = user;
  }
  readonly accessToken: string;
  readonly user: User;
}
