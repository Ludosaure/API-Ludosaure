import { LoginRequestDTO } from '../../dto/request/login-request.dto';

export class LoginCommand {
  public readonly email: string;
  public readonly password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
  public static of(loginRequest: LoginRequestDTO): LoginCommand {
    const { email, password } = loginRequest;
    return new LoginCommand(email, password);
  }
}
