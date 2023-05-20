import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateNewsCommand } from "./update-news.command";
import { NewsEntityRepository } from "../../news-entity.repository";
import { NewsNotFoundException } from "../../exceptions/news-not-found.exception";
import { NewsCantEndInThePastException } from "../../exceptions/news-cant-end-in-the-past.exception";

@CommandHandler(UpdateNewsCommand)
export class UpdateNewsHandler implements ICommandHandler<UpdateNewsCommand> {
  constructor(
    private readonly newsRepository: NewsEntityRepository
  ) {
  }

  async execute(command: UpdateNewsCommand): Promise<void> {
    const  endDate  = new Date(command.endDate);
    const foundNews = await this.newsRepository.findById(command.id);
    if (foundNews == null) {
      throw new NewsNotFoundException();
    }
    if (endDate < new Date()) {
      throw new NewsCantEndInThePastException();
    }
    foundNews.endDate = endDate;

    await this.newsRepository.saveOrUpdate(foundNews);
  }
}
