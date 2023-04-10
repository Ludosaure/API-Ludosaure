import {Injectable} from '@nestjs/common';
import {
  PasswordAndConfirmPasswordNotMatchException
} from '../modules/authentication/exception/password-and-confirm-not-match.exception';
import {BadPasswordFormatException} from '../modules/authentication/exception/bad-password-format.exception';
import {passwordStrength} from 'check-password-strength';

@Injectable()
export class PasswordValidator {
  validate(password: string, confirmPassword: string): void {
    if (confirmPassword != password) {
      throw new PasswordAndConfirmPasswordNotMatchException();
    }
    const strength = passwordStrength(password);
    if (
      strength.id < 2 || strength.length < 8 ||
      !strength.contains.includes('uppercase') ||
      !strength.contains.includes('lowercase') ||
      !strength.contains.includes('number') ||
      !strength.contains.includes('symbol')
    ) {
      throw new BadPasswordFormatException();
    }
  }
}
