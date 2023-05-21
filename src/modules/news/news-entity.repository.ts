import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";
import { News } from "../../domain/model/news.entity";
import { NewsRepository } from "../../infrastructure/news.repository";

@Injectable()
export class NewsEntityRepository extends Repository<News> implements NewsRepository {
  constructor(@InjectRepository(News)
              private newsRepository: Repository<News>) {
    super(newsRepository.target,
      newsRepository.manager,
      newsRepository.queryRunner);
  }

  async findAll(): Promise<News[]> {
    return await this.find();
  }

  findById(id: string): Promise<News> {
    return this.findOneBy({ id: id });
  }

  findTodayNews(): Promise<News[]> {
    return this.find({
      where: {
        endDate: MoreThan(new Date()),
      }
    });
  }

  async saveOrUpdate(news: News): Promise<void> {
    await this.save(news);
  }

  async deleteNews(news: News): Promise<void> {
    await this.delete(news);
  }
}
