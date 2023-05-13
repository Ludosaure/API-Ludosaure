import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Role } from "../../domain/model/enum/role";
import { User } from "../../domain/model/user.entity";

@Injectable()
export class OwnGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user: User = req.user;
    return user.isAccountActive() && (req.user.role == Role.ADMIN.toString() || user.id === req.body.userId || user.id === req.params.userId);
  }
}
