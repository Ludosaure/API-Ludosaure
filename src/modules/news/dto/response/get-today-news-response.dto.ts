import { News } from "../../../../domain/model/news.entity";

export class GetTodayNewsResponseDto {
  news: News[];
  constructor(news: News[]) {
    this.news = news;
  }
}
