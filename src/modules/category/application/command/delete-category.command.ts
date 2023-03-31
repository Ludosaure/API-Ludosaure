import {DeleteCategoryRequestDto} from "../../dto/request/delete-category-request.dto";

export class DeleteCategoryCommand {
    public readonly id: string;

    constructor(id: string) {
        this.id = id;
    }

    public static of(deleteCategoryRequest: DeleteCategoryRequestDto): DeleteCategoryCommand {
        const {id} = deleteCategoryRequest;
        return new DeleteCategoryCommand(id);
    }
}
