import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUsersQuery } from './get-all-users.query';
import { GetAllUsersResponseDTO } from '../../dto/response/get-all-users-response.dto';
import {UserEntityRepository} from "../../user-entity.repository";

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements ICommandHandler<GetAllUsersQuery> {
  constructor(
    private readonly userRepository: UserEntityRepository,
  ) {}

  async execute(): Promise<GetAllUsersResponseDTO> {
    const users = await this.userRepository.find();
    return new GetAllUsersResponseDTO(users);
  }
}
