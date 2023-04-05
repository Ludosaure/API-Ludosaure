import { User } from '../domain/model/user.entity';

export interface UserRepository {
  findById(userId: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  saveOrUpdate(user: User): Promise<void>;
}
