import {User} from "../../../infrastructure/model/user.entity";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../../../domain/user.repository";

@Injectable()
export class UserEntityRepository extends Repository<User> implements UserRepository {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneBy({email});
    }

}
