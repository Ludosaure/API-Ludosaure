import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTodayNewsResponseDto } from "../../dto/response/get-today-news-response.dto";
import { GetTodayNewsQuery } from "./get-today-news.query";
import { NewsEntityRepository } from "../../news-entity.repository";

@QueryHandler(GetTodayNewsQuery)
export class GetTodayNewsHandler implements IQueryHandler<GetTodayNewsQuery, GetTodayNewsResponseDto> {
  constructor(private readonly newsRepository: NewsEntityRepository) {}

  public async execute(): Promise<GetTodayNewsResponseDto> {
    const news = await this.newsRepository.findTodayNews();
    return new GetTodayNewsResponseDto(news);
  }
}
