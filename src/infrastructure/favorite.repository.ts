import { FavoriteGame } from "../domain/model/favorite-game.entity";

export interface FavoriteRepository {

    findByUserId(userId: string): Promise<FavoriteGame[]>;

    findByGameId(gameId: string): Promise<FavoriteGame[]>;

    findByUserIdAndGameId(userId: string, gameId: string): Promise<FavoriteGame>;

    saveOrUpdate(favoriteGame: FavoriteGame): Promise<void>;

    deleteFavoriteGameByUserIdAndGameId(userId: string, gameId: string): Promise<void>;
}
