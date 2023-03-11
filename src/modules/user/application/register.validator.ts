import {Injectable} from '@nestjs/common';
import {RegisterCommand} from './commands/register.command';
import {PasswordAndConfirmPasswordNotMatchException} from './exception/password-and-confirm-not-match.exception';
import {BadPasswordFormatException} from "./exception/bad-password-format.exception";
import {passwordStrength} from "check-password-strength";

interface Validator<T> {
    validate(command: T): boolean;
}

@Injectable()
export class RegisterValidator implements Validator<RegisterCommand> {
    validate(command: RegisterCommand): boolean {
        if (command.confirmPassword != command.password) {
            throw new PasswordAndConfirmPasswordNotMatchException();
        }
        const strength = passwordStrength(command.password);
        if (strength.id === 0 &&
            strength.length < 8 &&
            !strength.contains.includes('uppercase') &&
            !strength.contains.includes('lowercase') &&
            !strength.contains.includes('number') &&
            !strength.contains.includes('symbol')) {
            throw new BadPasswordFormatException();
        }
        return true;
    }
}
