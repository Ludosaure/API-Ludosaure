import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Role} from "../infrastructure/model/enum/role";

@Injectable()
export class OwnGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        return req.user.is_account_verified && !req.user.is_account_closed &&
            (req.user.role == Role.ADMIN.toString() || req.user.user_id === req.body.userId);
    }
}
