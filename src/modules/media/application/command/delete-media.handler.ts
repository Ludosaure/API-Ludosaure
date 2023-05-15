import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { MediaEntityRepository } from "../../media-entity.repository";
import { environmentConfig } from "../../../../config/environment.config";
import { S3 } from "aws-sdk";
import { DeleteMediaCommand } from "./delete-media.command";

@CommandHandler(DeleteMediaCommand)
export class DeleteMediaHandler implements ICommandHandler<DeleteMediaCommand> {
  constructor(private mediaRepository: MediaEntityRepository) {
  }

  async execute(command: DeleteMediaCommand): Promise<void> {
    const media = await this.mediaRepository.findById(command.mediaId);
    const s3 = new S3();
    await s3.deleteObject({
      Bucket: environmentConfig.awsBucketName,
      Key: media.key
    }).promise();
    await this.mediaRepository.deleteMedia(media.id);
  }
}

