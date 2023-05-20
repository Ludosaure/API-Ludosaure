import { HttpException, HttpStatus } from "@nestjs/common";

export class NewsCantEndInThePastException extends HttpException {
  constructor() {
    super("News can't end in the past", HttpStatus.BAD_REQUEST);
  }
}
