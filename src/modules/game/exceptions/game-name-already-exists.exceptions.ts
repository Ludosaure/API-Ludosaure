import { HttpException, HttpStatus } from "@nestjs/common";

export class GameNameAlreadyExistsExceptions extends HttpException {
    constructor(name: string) {
        super(`Game with name ${name} already exists`, HttpStatus.CONFLICT);
    }
}
