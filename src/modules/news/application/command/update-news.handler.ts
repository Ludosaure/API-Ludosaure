import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateNewsCommand } from "./update-news.command";
import { NewsEntityRepository } from "../../news-entity.repository";
import { NewsNotFoundException } from "../../exceptions/news-not-found.exception";

@CommandHandler(UpdateNewsCommand)
export class UpdateNewsHandler implements ICommandHandler<UpdateNewsCommand> {
  constructor(
    private readonly newsRepository: NewsEntityRepository,
  ) {}

  async execute(command: UpdateNewsCommand): Promise<void> {
    const foundNews = await this.newsRepository.findById(command.id);
    if(foundNews == null) {
      throw new NewsNotFoundException();
    }
    foundNews.endDate = command.endDate;

    await this.newsRepository.saveOrUpdate(foundNews);
  }
}
