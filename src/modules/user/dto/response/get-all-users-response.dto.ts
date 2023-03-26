import { User } from '../../../../infrastructure/model/user.entity';

export class GetAllUsersResponseDto {
  readonly users: User[];
  constructor(users: User[]) {
    this.users = users;
  }
}
