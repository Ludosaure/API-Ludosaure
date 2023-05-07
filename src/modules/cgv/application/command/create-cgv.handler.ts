import { CommandHandler } from "@nestjs/cqrs";
import { CreateCgvCommand } from "./create-cgv.command";
import * as fs from "fs";
import { ImpossibleToProcessCgvException } from "../../exceptions/impossible-to-process-cgv.exception";
import { environmentConfig } from "../../../../config/environment.config";

@CommandHandler(CreateCgvCommand)
export class CreateCgvHandler {

  async execute(command: CreateCgvCommand) {
    const cgv = { cgv: command.cgv };
    const cgvJson = JSON.stringify(cgv);
    try {
      fs.writeFileSync(environmentConfig.cgvFilePath, cgvJson);
    } catch (err) {
      console.error(err)
      throw new ImpossibleToProcessCgvException(err);
    }
  }
}
