import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, InternalServerErrorException, Post, Put, Query, UseGuards} from "@nestjs/common";
import {RolesGuard} from "../../shared/guards/roles.guard";
import {JwtAuthGuard} from "../../shared/guards/jwt-auth.guard";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {GetAllPlansResponseDto} from "./dto/response/get-all-plans-response.dto";
import {GetAllPlansQuery} from "./application/query/get-all-plans.query";
import {Roles} from "../../shared/roles.decorator";
import {Role} from "../../domain/model/enum/role";
import {GetPlanByIdRequestDto} from "./dto/request/get-plan-by-id-request.dto";
import {GetPlanByIdQuery} from "./application/query/get-plan-by-id.query";
import {getPlanByIdResponseDto} from "./dto/response/get-plan-by-id-response.dto";
import {PlanNotFoundException} from "./exceptions/plan-not-found.exception";
import {GetPlanByDurationRequestDto} from "./dto/request/get-plan-by-duration-request.dto";
import {GetPlanByDurationResponseDto} from "./dto/response/get-plan-by-duration-response.dto";
import {GetPlanByDurationQuery} from "./application/query/get-plan-by-duration.query";
import {CreatePlanRequestDto} from "./dto/request/create-plan-request.dto";
import {CreatePlanCommand} from "./application/command/create-plan.command";
import {UpdatePlanRequestDto} from "./dto/request/update-plan-request.dto";
import {UpdatePlanCommand} from "./application/command/update-plan.command";
import {DeletePlanCommand} from "./application/command/delete-plan.command";
import {DeletePlanRequestDto} from "./dto/request/delete-plan-request.dto";
import {NameAlreadyUsedException} from "./exceptions/name-already-used.exception";
import {ReductionAlreadyExistsException} from "./exceptions/reduction-already-exists.exception";
import {NbWeeksAlreadyExistsException} from "./exceptions/nb-weeks-already-exists.exception";

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
        try {
            return await this.queryBus.execute<
                GetAllPlansQuery,
                GetAllPlansResponseDto
            >(GetAllPlansQuery.of());
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException();
        }
    }

    @Roles(Role.ADMIN)
    @Get('/getById')
    async getPlanById(@Query() getPlanByIdRequest: GetPlanByIdRequestDto) {
        try {
            return await this.queryBus.execute<
                GetPlanByIdQuery,
                getPlanByIdResponseDto
            >(GetPlanByIdQuery.of(getPlanByIdRequest));
        } catch (error) {
            if (error instanceof PlanNotFoundException) {
                throw new PlanNotFoundException();
            } else {
                console.error(error);
                throw new InternalServerErrorException();
            }
        }
    }

    @Roles(Role.ADMIN, Role.CLIENT)
    @Get('/getByDuration')
    async getPlansByDuration(@Query() getPlansByDurationRequest: GetPlanByDurationRequestDto) {
        try {
            return await this.queryBus.execute<
                GetPlanByDurationQuery,
                GetPlanByDurationResponseDto
            >(GetPlanByDurationQuery.of(getPlansByDurationRequest));
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException();
        }
    }

    @Roles(Role.ADMIN)
    @Post('/create')
    async createPlan(@Body() createPlanRequest: CreatePlanRequestDto) {
        try {
            return await this.commandBus.execute<CreatePlanCommand>(
                CreatePlanCommand.of(createPlanRequest)
            );
        } catch (error) {
            if (error instanceof NameAlreadyUsedException) {
                throw new NameAlreadyUsedException();
            } else if (error instanceof ReductionAlreadyExistsException) {
                throw new ReductionAlreadyExistsException();
            } else if (error instanceof NbWeeksAlreadyExistsException) {
                throw new NbWeeksAlreadyExistsException();
            } else {
                console.error(error);
                throw new InternalServerErrorException();
            }
        }
    }

    @Roles(Role.ADMIN)
    @Put('/update')
    async updatePlan(@Body() updatePlanRequest: UpdatePlanRequestDto) {
        try {
            return await this.commandBus.execute<UpdatePlanCommand>(
                UpdatePlanCommand.of(updatePlanRequest)
            );
        } catch (error) {
            if (error instanceof PlanNotFoundException) {
                throw new PlanNotFoundException();
            } else {
                console.error(error);
                throw new InternalServerErrorException();
            }
        }
    }

    @Roles(Role.ADMIN)
    @Delete('/delete')
    async deletePlan(@Body() deletePlanRequest: DeletePlanRequestDto) {
        try {
            return await this.commandBus.execute<DeletePlanCommand>(
                DeletePlanCommand.of(deletePlanRequest)
            );
        } catch (error) {
            if (error instanceof PlanNotFoundException) {
                throw new PlanNotFoundException();
            } else {
                console.error(error);
                throw new InternalServerErrorException();
            }
        }
    }
}
