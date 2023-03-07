import {User} from "../infrastructure/model/user.entity";

export interface UserRepository {
  findByEmail(email: string): Promise<User>;
}
