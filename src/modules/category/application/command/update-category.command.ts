import {UpdateCategoryRequestDto} from "../../dto/request/update-category-request.dto";

export class UpdateCategoryCommand {
    public readonly id: string;
    public readonly name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    public static of(updateCategoryRequestDto: UpdateCategoryRequestDto): UpdateCategoryCommand {
        const {id, name} = updateCategoryRequestDto;
        return new UpdateCategoryCommand(id, name);
    }
}
