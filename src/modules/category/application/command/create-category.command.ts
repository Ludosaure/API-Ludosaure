import {CreateCategoryRequestDto} from "../../dto/request/create-category-request.dto";

export class CreateCategoryCommand {
    public readonly name: string;

    private constructor(name: string) {
        this.name = name;
    }

    public static of(createCategoryRequestDto: CreateCategoryRequestDto): CreateCategoryCommand {
        const {name} = createCategoryRequestDto;
        return new CreateCategoryCommand(name);
    }
}
