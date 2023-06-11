import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUsersQuery } from './get-all-users.query';
import { GetAllUsersResponseDto } from '../../dto/response/get-all-users-response.dto';
import {UserEntityRepository} from "../../user-entity.repository";

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements ICommandHandler<GetAllUsersQuery> {
  constructor(
    private readonly userRepository: UserEntityRepository,
  ) {}

  async execute(): Promise<GetAllUsersResponseDto> {
    const users = await this.userRepository.findAll();
    for(let user of users) {
      user.password = undefined;
    }
    return new GetAllUsersResponseDto(users);
  }
}
