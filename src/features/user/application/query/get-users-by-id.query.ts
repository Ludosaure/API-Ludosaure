import {GetUsersByIdRequest} from '../../dto/request/get-users-by-id-request.dto';

export class GetUsersByIdQuery {
  public readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
  public static of(
    getUsersByIdRequest: GetUsersByIdRequest,
  ): GetUsersByIdQuery {
    const { id } = getUsersByIdRequest;
    return new GetUsersByIdQuery(id);
  }
}
