import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../enums/error-code.enum';

export class GameNotFoundException extends HttpException {
  constructor() {
    super('Game not found', ErrorCode.NOT_FOUND);
  }
}
