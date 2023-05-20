import { DeleteNewsCommand } from "./delete-news.command";
import { NewsEntityRepository } from "../../news-entity.repository";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NewsNotFoundException } from "../../exceptions/news-not-found.exception";

@CommandHandler(DeleteNewsCommand)
export class DeleteNewsHandler implements ICommandHandler<DeleteNewsCommand> {
  constructor(
    private readonly newsRepository: NewsEntityRepository,
  ) {}

  async execute(command: DeleteNewsCommand): Promise<void> {
    const foundNews = await this.newsRepository.findById(command.id);
    if(foundNews == null) {
      throw new NewsNotFoundException();
    }
    await this.newsRepository.deleteNews(foundNews);
  }
}
