import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateNewsCommand } from "./create-news.command";
import { MediaNotFoundException } from "../../../../shared/exceptions/media-not-found.exception";
import { MediaEntityRepository } from "../../../media/media-entity.repository";
import { NewsEntityRepository } from "../../news-entity.repository";
import { News } from "../../../../domain/model/news.entity";

@CommandHandler(CreateNewsCommand)
export class CreateNewsHandler implements ICommandHandler<CreateNewsCommand> {
  constructor(
    private readonly newsRepository: NewsEntityRepository,
    private readonly mediaRepository: MediaEntityRepository,
  ) {}

  async execute(command: CreateNewsCommand): Promise<void> {
    const picture = await this.mediaRepository.findById(command.pictureId);
    if(picture == null) {
      throw new MediaNotFoundException();
    }
    const news = new News();
    news.endDate = command.endDate;
    news.picture = picture;

    await this.newsRepository.saveOrUpdate(news);
  }
}
