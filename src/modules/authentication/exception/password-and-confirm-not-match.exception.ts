import {HttpException, HttpStatus} from '@nestjs/common';

export class PasswordAndConfirmPasswordNotMatchException extends HttpException {
  constructor() {
    super(
      'Passwords and confirm password are not matching',
        HttpStatus.BAD_REQUEST,
    );
  }
}
