import {Controller, Get, InternalServerErrorException, Query} from "@nestjs/common";
import {User} from "../../infrastructure/model/user.entity";
import {ApiTags} from "@nestjs/swagger";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {GetAllUsersResponse} from "./dto/response/get-all-users-response";
import {GetAllUsersQuery} from "./application/query/get-all-users.query";

@ApiTags('User')
@Controller('users')
export class UserController {
    private readonly commandBus: CommandBus;
    private readonly queryBus: QueryBus;

    constructor(commandBus: CommandBus, queryBus: QueryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    @Get('')
    async getAll() {
        try {
            return await this.queryBus.execute<GetAllUsersQuery, GetAllUsersResponse>(GetAllUsersQuery.of());
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException();
        }
    }
}
