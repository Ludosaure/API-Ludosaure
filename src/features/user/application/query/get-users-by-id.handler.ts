import {ICommandHandler, QueryHandler} from '@nestjs/cqrs';
import {UserRepository} from '../../../../domain/user.repository';
import {GetUsersByIdQuery} from './get-users-by-id.query';
import {GetUsersByIdResponse} from '../../dto/response/get-users-by-id-response.dto';
import {UserEntityRepository} from "../../repository/user-entity.repository";
import {User} from "../../../../infrastructure/model/user.entity";
import {appDataSource} from "../../../../infrastructure/server";

@QueryHandler(GetUsersByIdQuery)
export class GetUsersByIdHandler implements ICommandHandler<GetUsersByIdQuery> {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserEntityRepository(User, appDataSource.createEntityManager());
  }

  async execute(query: GetUsersByIdQuery): Promise<GetUsersByIdResponse> {
    const { name } = query;

    const users = await this.userRepository.findById(name);

    return new GetUsersByIdResponse(users);
  }
}
