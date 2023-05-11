import { Media } from "../domain/model/media.entity";

export interface MediaRepository {
    findById(id: string): Promise<Media>;

    saveOrUpdate(plan: Media): Promise<void>;

    deleteMedia(plan: Media): Promise<void>;
}
