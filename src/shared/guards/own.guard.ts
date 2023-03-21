import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Role} from "../../infrastructure/model/enum/role";
import {User} from "../../infrastructure/model/user.entity";

@Injectable()
export class OwnGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const user: User = req.user;
        return user.isAccountActive() && (req.user.role == Role.ADMIN.toString() || req.user.user_id === req.body.userId);
    }
}
