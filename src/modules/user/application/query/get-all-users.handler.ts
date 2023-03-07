import {ICommandHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllUsersQuery} from "./get-all-users.query";
import {GetAllUsersResponse} from "../../dto/response/get-all-users-response";
import {UserEntityRepository} from "../../db/user-entity-repository.service";

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements ICommandHandler<GetAllUsersQuery> {

    constructor(
        private readonly userRepository: UserEntityRepository, // import as usual
    ) {}

    async execute(): Promise<GetAllUsersResponse> {
        const users = await this.userRepository.find();
        return new GetAllUsersResponse(users);
    }
}
