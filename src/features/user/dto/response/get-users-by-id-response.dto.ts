import {User} from "../../../../infrastructure/model/user.entity";

export class GetUsersByIdResponse {
  constructor(user: User) {
    this.user = user;
  }
  readonly user: User;
}
