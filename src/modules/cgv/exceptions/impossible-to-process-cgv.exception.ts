import { HttpException } from "@nestjs/common";

export class ImpossibleToProcessCgvException extends HttpException {
  constructor(err) {
    super("Impossible to process CGV : " + err, 500);
  }
}
