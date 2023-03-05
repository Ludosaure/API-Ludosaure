import {User} from "../../../database/model/user.entity";

export class GetAllUsersResponse {
    constructor(users: User[]) {
        this.users = users;
    }
    readonly users: User[];
}
