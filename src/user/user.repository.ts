import {User} from "../database/model/user.entity";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserRepository extends Repository<User> {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

    async findByEmail(email: string): Promise<User[]> {
        return await this.userRepository.findBy({email});
    }

}
