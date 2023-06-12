import { User } from "../../domain/model/user.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../../infrastructure/user.repository";

@Injectable()
export class UserEntityRepository extends Repository<User> implements UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner
    );
  }

  findAll(): Promise<User[]> {
    return this.find({
      relations: {
        profilePicture: true
      }
    });
  }

  findById(userId: string): Promise<User> {
    return this.findOneBy({ id: userId });
  }

  findByEmail(email: string): Promise<User> {
    return this.manager
      .createQueryBuilder(User, "user")
      .leftJoinAndSelect("user.profilePicture", "profilePicture")
      .where("TRIM(LOWER(user.email)) = TRIM(LOWER(:email))", { email: email })
      .getOne();
  }

  async saveOrUpdate(user: User): Promise<void> {
    await this.save(user);
  }
}
