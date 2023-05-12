import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { v4 as uuid } from "uuid";
import { Media } from "../../domain/model/media.entity";
import { environmentConfig } from "../../config/environment.config";
import { MediaEntityRepository } from "./media-entity.repository";

@Injectable()
export class MediaService {
  constructor(private mediaRepository: MediaEntityRepository) {
  }

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: environmentConfig.awsBucketName,
      Body: dataBuffer,
      Key: `${uuid()}-${filename}`
    }).promise();

    const media = new Media();
    media.key = uploadResult.Key;
    media.url = uploadResult.Location;

    await this.mediaRepository.saveOrUpdate(media);
    return media;
  }
}
