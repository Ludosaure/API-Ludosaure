import { HttpException, HttpStatus } from "@nestjs/common";

export class NewsNotFoundException extends HttpException {
  constructor() {
    super('News not found', HttpStatus.NOT_FOUND);
  }
}
