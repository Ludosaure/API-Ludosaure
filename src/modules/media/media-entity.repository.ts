import { Repository } from "typeorm";
import { Media } from "../../domain/model/media.entity";
import { MediaRepository } from "../../infrastructure/media.repository";
import { InjectRepository } from "@nestjs/typeorm";

export class MediaEntityRepository extends Repository<Media> implements MediaRepository {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>
  ) {
    super(mediaRepository.target, mediaRepository.manager, mediaRepository.queryRunner);
  }

  findById(id: string): Promise<Media> {
    return this.findOne({
      where: {
        id: id
      }
    });
  }

  async saveOrUpdate(media: Media): Promise<void> {
    await this.save(media);
  }

  async deleteMedia(media: Media): Promise<void> {
    await this.remove(media);
  }
}
