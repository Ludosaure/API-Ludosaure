import { Media } from "../../../../domain/model/media.entity";

export class CreateMediaResponseDto {
  readonly media: Media;
  constructor(media: Media) {
    this.media = media;
  }
}
