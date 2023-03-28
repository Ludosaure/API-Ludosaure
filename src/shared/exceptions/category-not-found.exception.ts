import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../enums/error-code.enum';

export class CategoryNotFoundException extends HttpException {
  constructor() {
    super('Category not found', ErrorCode.NOT_FOUND);
  }
}
