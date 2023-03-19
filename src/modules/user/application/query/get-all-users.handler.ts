import {ICommandHandler, QueryHandler} from '@nestjs/cqrs';
import {GetAllUsersQuery} from './get-all-users.query';
import {GetAllUsersResponseDto} from '../../dto/response/get-all-users-response.dto';
import {UserEntityRepository} from '../../db/user-entity-repository.service';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements ICommandHandler<GetAllUsersQuery> {
  constructor(
    private readonly userRepository: UserEntityRepository, // import as usual
  ) {}

  async execute(): Promise<GetAllUsersResponseDto> {
    const users = await this.userRepository.find();
    return new GetAllUsersResponseDto(users);
  }
}
