import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetCgvQuery } from "./get-cgv.query";
import { GetCgvResponseDto } from "../../dto/response/get-cgv-response.dto";
import { ImpossibleToProcessCgvException } from "../../exceptions/impossible-to-process-cgv.exception";
import { environmentConfig } from "../../../../config/environment.config";
const fs = require("fs");

@QueryHandler(GetCgvQuery)
export class GetCgvHandler implements IQueryHandler<GetCgvQuery> {
  async execute() {
    try {
      const cgv = fs.readFileSync(environmentConfig.cgvFilePath);
      const cgvJson = JSON.parse(cgv);
      return new GetCgvResponseDto(cgvJson.cgv);
    } catch (err) {
      console.error(err);
      throw new ImpossibleToProcessCgvException(err);
    }
  }
}
