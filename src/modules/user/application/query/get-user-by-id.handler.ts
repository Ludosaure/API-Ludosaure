import { GetUserByIdQuery } from "./get-user-by-id.query";
import { UserEntityRepository } from "../../user-entity.repository";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { User } from "../../../../domain/model/user.entity";

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly userRepository: UserEntityRepository) {
  }

  async execute(query: GetUserByIdQuery): Promise<User> {
    return await this.userRepository.findById(query.userId);
  }
}