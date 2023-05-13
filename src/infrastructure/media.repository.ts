import { Media } from "../domain/model/media.entity";

export interface MediaRepository {
    findById(id: string): Promise<Media>;

    saveOrUpdate(media: Media): Promise<void>;

    deleteMedia(mediaId: string): Promise<void>;
}
