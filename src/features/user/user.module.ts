import {Module} from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserController} from './user.controller';
import {GetUsersByIdHandler} from './application/query/get-users-by-id.handler';
import {User} from "../../infrastructure/model/user.entity";
import {UserEntityRepository} from "./repository/user-entity.repository";

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User, UserEntityRepository])],
  controllers: [UserController],
  providers: [
    // GetUsersByIdHandler,
    // UserEntityRepository,
  ],
})
export class UserModule {}
