import {Faq} from "../../../../domain/model/faq.entity";

export class GetAllFaqResponseDto {
    faqs: Faq[];
    constructor(faqs: Faq[]) {
        this.faqs = faqs;
    }
}
