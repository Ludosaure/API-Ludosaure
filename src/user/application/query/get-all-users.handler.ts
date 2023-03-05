import {ICommandHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllUsersQuery} from "./get-all-users.query";
import {Inject} from "@nestjs/common";
import {USER_REPOSITORY} from "../../../config/constants";
import {Repository} from "typeorm";
import {User} from "../../../database/model/user.entity";
import {GetAllUsersResponse} from "../../dto/response/get-all-users-response";
import {UserRepository} from "../../user.repository";

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements ICommandHandler<GetAllUsersQuery> {

    constructor(
        @Inject(USER_REPOSITORY)
        private userRepository: UserRepository,
    ) {
    }

    async execute(command: GetAllUsersQuery): Promise<GetAllUsersResponse> {
        const users = await this.userRepository.find();
        return new GetAllUsersResponse(users);
    }
}
