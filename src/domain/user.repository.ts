import {User} from "../infrastructure/model/user.entity";

export interface UserRepository {
  findById(userId: string): Promise<User>;
  saveUser(user: User): Promise<void>;
}