import {DeleteFaqRequestDto} from "../../dto/request/delete-faq-request.dto";

export class DeleteFaqCommand {
    public readonly id: string;

    constructor(id: string) {
        this.id = id;
    }

    public static of(deleteFaqRequest: DeleteFaqRequestDto): DeleteFaqCommand {
        const {id} = deleteFaqRequest;
        return new DeleteFaqCommand(id);
    }
}
