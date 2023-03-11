import { HttpException } from '@nestjs/common';
import {ErrorCode} from "../../../../shared/error-code.enum";

export class PasswordsDoesNotMatch extends HttpException {
  constructor() {
    super('Passwords does not match', ErrorCode.BAD_REQUEST);
  }
}
