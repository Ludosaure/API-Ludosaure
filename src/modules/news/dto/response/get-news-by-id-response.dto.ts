import { News } from "../../../../domain/model/news.entity";

export class GetNewsByIdResponseDto {
  singleNewResult: News;
  constructor(singleNewResult: News) {
    this.singleNewResult = singleNewResult;
  }
}
