import {Role} from "../domain/model/enum/role";
import {SetMetadata} from "@nestjs/common";

export const ROLES_KEY = 'Role';
export const Roles = (...roles: Role[]) =>
    SetMetadata(ROLES_KEY, roles);
