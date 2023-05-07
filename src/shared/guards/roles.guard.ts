import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../roles.decorator";
import { User } from "../../domain/model/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {
    }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
        if (!roles) {
            return false;
        }
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        return this.matchRoles(roles, user.role);
    }

    matchRoles(roles: string[], userRole: string): boolean {
        return roles.some(role => role === userRole);
    }
}
