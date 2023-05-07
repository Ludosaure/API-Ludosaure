import { CreateCgvRequestDto } from "../../dto/request/create-cgv-request.dto";

export class CreateCgvCommand {
  cgv: string;

  private constructor(cgv: string) {
    this.cgv = cgv;
  }

  static of(createCgvRequestDto: CreateCgvRequestDto): CreateCgvCommand {
    const { cgv } = createCgvRequestDto;
    return new CreateCgvCommand(cgv);
  }
}
