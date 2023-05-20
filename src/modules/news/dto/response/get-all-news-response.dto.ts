import { News } from "../../../../domain/model/news.entity";

export class GetAllNewsResponseDto {
  news: News[];
  constructor(news: News[]) {
    this.news = news;
  }
}
