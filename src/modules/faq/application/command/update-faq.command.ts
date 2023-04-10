import {UpdateFaqRequestDto} from "../../dto/request/update-faq-request.dto";

export class UpdateFaqCommand {
    public readonly id: string;
    public readonly question: string;
    public readonly answer: string;

    constructor(id: string, question: string, answer: string) {
        this.id = id;
        this.question = question;
        this.answer = answer;
    }

    public static of(updateFaqRequest: UpdateFaqRequestDto): UpdateFaqCommand {
        const {id, question, answer} = updateFaqRequest;
        return new UpdateFaqCommand(id, question, answer);
    }
}
