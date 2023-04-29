import { UserEntityRepository } from "../user/user-entity.repository";
import { verify } from "argon2";
import { Injectable } from "@nestjs/common";
import { UserNotFoundException } from "../../shared/exceptions/user-not-found.exception";
import { AccountNotVerifiedException } from "./exception/account-not-verified.exception";
import { AccountClosedException } from "./exception/account-closed.exception";
import { PasswordsDoesNotMatchException } from "./exception/password-does-not-match.exception";
import { LoginResponseDto } from "./dto/response/login-response.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthenticationService {
  constructor(private readonly userRepository: UserEntityRepository,
              private readonly jwtService: JwtService,
              ) {}

  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundException();
    }
    if (!user.isAccountVerified) {
      throw new AccountNotVerifiedException();
    }
    if (user.isAccountClosed) {
      throw new AccountClosedException();
    }

    const passwordMatched = await verify(user.password, hashedPassword);
    if (!passwordMatched) {
      throw new PasswordsDoesNotMatchException();
    }

    return user;
  }

  public getJwtToken(userId: string) {
    return this.jwtService.sign({userId: userId});
  }
}
