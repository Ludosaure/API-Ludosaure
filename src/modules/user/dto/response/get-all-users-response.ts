import {User} from "../../../../infrastructure/model/user.entity";

export class GetAllUsersResponse {
    constructor(users: User[]) {
        this.users = users;
    }
    readonly users: User[];
}
