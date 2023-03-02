import {UserRepository} from 'src/domain/user.repository';
import {User} from "../../../infrastructure/model/user.entity";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserEntityRepository extends Repository<User> implements UserRepository {
    findById(userId: string): Promise<User> {
        return this.findOne({
            where: {
                id: userId
            }
        })
    }

    async saveUser(user: User): Promise<void> {
        await this.save(user);
    }
}
