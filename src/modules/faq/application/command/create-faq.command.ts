import {CreateFaqRequestDto} from "../../dto/request/create-faq-request.dto";

export class CreateFaqCommand {
    public readonly question: string;
    public readonly answer: string;

    private constructor(question: string, answer: string) {
        this.question = question;
        this.answer = answer;
    }

    public static of(createFaqRequest: CreateFaqRequestDto): CreateFaqCommand {
        const {question, answer} = createFaqRequest;
        return new CreateFaqCommand(question, answer);
    }
}
