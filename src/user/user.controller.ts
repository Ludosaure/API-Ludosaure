import {Controller, Get, InternalServerErrorException, Query} from "@nestjs/common";
import {User} from "../database/model/user.entity";
import {ApiTags} from "@nestjs/swagger";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {GetAllUsersRequest} from "./dto/request/get-all-users-request";
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
    async getAll(@Query() getUsersByNameRequest: GetAllUsersRequest) {
        try {
            return await this.queryBus.execute<GetAllUsersQuery, GetAllUsersResponse>(GetAllUsersQuery.of(getUsersByNameRequest));
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException();
        }
    }
}
