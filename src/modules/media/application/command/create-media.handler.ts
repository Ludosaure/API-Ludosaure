import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateMediaCommand } from "./create-media.command";
import { CreateMediaResponseDto } from "../../dto/response/create-media-response.dto";
import { MediaEntityRepository } from "../../media-entity.repository";
import { environmentConfig } from "../../../../config/environment.config";
import { Media } from "../../../../domain/model/media.entity";
import { S3 } from "aws-sdk";
import { v4 as uuid } from "uuid";

@CommandHandler(CreateMediaCommand)
export class CreateMediaHandler implements ICommandHandler<CreateMediaCommand> {
  constructor(private mediaRepository: MediaEntityRepository) {
  }

  async execute(command: CreateMediaCommand): Promise<CreateMediaResponseDto> {
    const { imageBuffer, filename } = command;
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: environmentConfig.awsBucketName,
      Body: imageBuffer,
      Key: `${uuid()}-${filename}`
    }).promise();

    const media = new Media();
    media.key = uploadResult.Key;
    media.url = uploadResult.Location;

    await this.mediaRepository.saveOrUpdate(media);
    return new CreateMediaResponseDto(media);
  }
}

