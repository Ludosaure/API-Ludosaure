import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetAllUsersHandler } from './application/query/get-all-users.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../infrastructure/model/user.entity';
import { UserEntityRepository } from './db/user-entity-repository.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserEntityRepository, GetAllUsersHandler],
  exports: [UserEntityRepository, GetAllUsersHandler],
})
export class UserModule {}
