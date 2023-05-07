import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CgvController } from "./cgv.controller";
import { GetCgvHandler } from "./application/query/get-cgv.handler";
import { CreateCgvHandler } from "./application/command/create-cgv.handler";

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([])
  ],
  controllers: [CgvController],
  providers: [
    GetCgvHandler,
    CreateCgvHandler,
  ]
})
export class CgvModule {
}
