import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateNewsCommand } from "./create-news.command";
import { MediaNotFoundException } from "../../../../shared/exceptions/media-not-found.exception";
import { MediaEntityRepository } from "../../../media/media-entity.repository";
import { NewsEntityRepository } from "../../news-entity.repository";
import { News } from "../../../../domain/model/news.entity";
import { NewsCantEndInThePastException } from "../../exceptions/news-cant-end-in-the-past.exception";

@CommandHandler(CreateNewsCommand)
export class CreateNewsHandler implements ICommandHandler<CreateNewsCommand> {
  constructor(
    private readonly newsRepository: NewsEntityRepository,
    private readonly mediaRepository: MediaEntityRepository
  ) {
  }

  async execute(command: CreateNewsCommand): Promise<void> {
    const { pictureId } = command;
    const endDate = new Date(command.endDate);
    const picture = await this.mediaRepository.findById(pictureId);
    if (picture == null) {
      throw new MediaNotFoundException();
    }
    if (endDate < new Date()) {
      throw new NewsCantEndInThePastException();
    }
    const news = new News();
    news.endDate = endDate;
    news.picture = picture;

    await this.newsRepository.saveOrUpdate(news);
  }
}
