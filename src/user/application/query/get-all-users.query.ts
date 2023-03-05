import {GetAllUsersRequest} from "../../dto/request/get-all-users-request";

export class GetAllUsersQuery {

    public static of(getAllUsersRequest: GetAllUsersRequest): GetAllUsersQuery {
        return new GetAllUsersQuery();
    }
}
