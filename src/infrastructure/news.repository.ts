import { News } from "../domain/model/news.entity";

export interface NewsRepository {
  findAll(): Promise<News[]>;
  findById(newsId: string): Promise<News>;
  findTodayNews(): Promise<News[]>;
  saveOrUpdate(news: News): Promise<void>;
  deleteNews(news: News): Promise<void>;
}
