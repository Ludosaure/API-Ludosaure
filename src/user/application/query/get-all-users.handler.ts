import {ICommandHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllUsersQuery} from "./get-all-users.query";
import {GetAllUsersResponse} from "../../dto/response/get-all-users-response";
import {UserRepository} from "../../user.repository";

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements ICommandHandler<GetAllUsersQuery> {

    constructor(
        private readonly userRepository: UserRepository, // import as usual
    ) {}

    async execute(command: GetAllUsersQuery): Promise<GetAllUsersResponse> {
        const users = await this.userRepository.find();
        return new GetAllUsersResponse(users);
    }
}
