import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../../shared/guards/roles.guard";
import { JwtAuthGuard } from "../../shared/guards/jwt-auth.guard";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetAllPlansResponseDto } from "./dto/response/get-all-plans-response.dto";
import { GetAllPlansQuery } from "./application/query/get-all-plans.query";
import { Roles } from "../../shared/roles.decorator";
import { Role } from "../../domain/model/enum/role";
import { GetPlanByIdQuery } from "./application/query/get-plan-by-id.query";
import { getPlanByIdResponseDto } from "./dto/response/get-plan-by-id-response.dto";
import { GetPlanByDurationRequestDto } from "./dto/request/get-plan-by-duration-request.dto";
import { GetPlanByDurationResponseDto } from "./dto/response/get-plan-by-duration-response.dto";
import { GetPlanByDurationQuery } from "./application/query/get-plan-by-duration.query";
import { CreatePlanRequestDto } from "./dto/request/create-plan-request.dto";
import { CreatePlanCommand } from "./application/command/create-plan.command";
import { UpdatePlanRequestDto } from "./dto/request/update-plan-request.dto";
import { UpdatePlanCommand } from "./application/command/update-plan.command";
import { DeletePlanCommand } from "./application/command/delete-plan.command";
import { DeletePlanRequestDto } from "./dto/request/delete-plan-request.dto";
import { GetPlanByIdRequestDto } from "./dto/request/get-plan-by-id-request.dto";

@ApiTags('Plan')
@Controller('plan')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class PlanController {
    private readonly commandBus: CommandBus;
    private readonly queryBus: QueryBus;

    constructor(commandBus: CommandBus, queryBus: QueryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    @Roles(Role.ADMIN, Role.CLIENT)
    @Get()
    async getAllPlans(): Promise<GetAllPlansResponseDto> {
        return await this.queryBus.execute<GetAllPlansQuery, GetAllPlansResponseDto>(GetAllPlansQuery.of());
    }

    @Roles(Role.ADMIN)
    @Get('/id/:id')
    async getPlanById(@Param() getPlanByIdRequest: GetPlanByIdRequestDto) {
        return await this.queryBus.execute<GetPlanByIdQuery, getPlanByIdResponseDto>(GetPlanByIdQuery.of(getPlanByIdRequest));
    }

    @Roles(Role.ADMIN, Role.CLIENT)
    @Get('/getByDuration')
    async getPlansByDuration(@Query() getPlansByDurationRequest: GetPlanByDurationRequestDto) {
        return await this.queryBus.execute<GetPlanByDurationQuery, GetPlanByDurationResponseDto>(GetPlanByDurationQuery.of(getPlansByDurationRequest));
    }

    @Roles(Role.ADMIN)
    @Post()
    async createPlan(@Body() createPlanRequest: CreatePlanRequestDto) {
        return await this.commandBus.execute<CreatePlanCommand>(CreatePlanCommand.of(createPlanRequest));
    }

    @Roles(Role.ADMIN)
    @Put()
    async updatePlan(@Body() updatePlanRequest: UpdatePlanRequestDto) {
        return await this.commandBus.execute<UpdatePlanCommand>(UpdatePlanCommand.of(updatePlanRequest));
    }

    @Roles(Role.ADMIN)
    @Delete()
    async deletePlan(@Body() deletePlanRequest: DeletePlanRequestDto) {
        return await this.commandBus.execute<DeletePlanCommand>(DeletePlanCommand.of(deletePlanRequest));
    }
}
