import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetNewsByIdQuery } from "./get-news-by-id.query";
import { GetNewsByIdResponseDto } from "../../dto/response/get-news-by-id-response.dto";
import { NewsEntityRepository } from "../../news-entity.repository";

@QueryHandler(GetNewsByIdQuery)
export class GetNewsByIdHandler implements IQueryHandler<GetNewsByIdQuery, GetNewsByIdResponseDto> {
  constructor(private readonly newsRepository: NewsEntityRepository) {}

  public async execute(query: GetNewsByIdQuery): Promise<GetNewsByIdResponseDto> {
    const news = await this.newsRepository.findById(query.id);
    return new GetNewsByIdResponseDto(news);
  }
}
