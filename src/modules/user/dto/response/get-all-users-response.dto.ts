import { User } from '../../../../infrastructure/model/user.entity';

export class GetAllUsersResponseDTO {
  readonly users: User[];
  constructor(users: User[]) {
    this.users = users;
  }
}
