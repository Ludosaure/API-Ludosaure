import {User} from '../../../../infrastructure/model/user.entity';

export class GetAllUsersResponseDto {
  constructor(users: User[]) {
    this.users = users;
  }
  readonly users: User[];
}
