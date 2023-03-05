import {User} from "../database/model/user.entity";

export interface UserRepository {
    find(): Promise<User[]>;
}
