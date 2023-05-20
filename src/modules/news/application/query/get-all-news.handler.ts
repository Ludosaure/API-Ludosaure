import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllNewsQuery } from "./get-all-news.query";
import { GetAllNewsResponseDto } from "../../dto/response/get-all-news-response.dto";
import { NewsEntityRepository } from "../../news-entity.repository";

@QueryHandler(GetAllNewsQuery)
export class GetAllNewsHandler implements IQueryHandler<GetAllNewsQuery, GetAllNewsResponseDto> {
  constructor(private readonly newsRepository: NewsEntityRepository) {}

  public async execute(): Promise<GetAllNewsResponseDto> {
    const news = await this.newsRepository.findAll();
    return new GetAllNewsResponseDto(news);
  }
}
