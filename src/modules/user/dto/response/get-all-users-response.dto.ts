import { User } from '../../../../domain/model/user.entity';

export class GetAllUsersResponseDto {
  readonly users: User[];
  constructor(users: User[]) {
    this.users = users;
  }
}
