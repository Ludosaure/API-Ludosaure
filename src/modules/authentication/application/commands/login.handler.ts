import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LoginCommand } from "./login.command";
import { LoginResponseDto } from "../../dto/response/login-response.dto";
import { AuthenticationService } from "../../authentication.service";

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly authenticationService: AuthenticationService,
  ) {
  }

  async execute(command: LoginCommand): Promise<LoginResponseDto> {
    return this.authenticationService.getAuthenticatedUser(command.email, command.password);
  }
}
