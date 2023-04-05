import { User } from '../../domain/model/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../infrastructure/user.repository';

@Injectable()
export class UserEntityRepository extends Repository<User> implements UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  findById(userId: string): Promise<User> {
    return this.findOneBy({ id: userId });
  }

  findByEmail(email: string): Promise<User> {
    return this.findOneBy({ email: email });
  }

  async saveOrUpdate(user: User): Promise<void> {
    await this.save(user);
  }
}
