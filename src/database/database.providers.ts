import {environmentConfig} from "../config/environment.config";
import {DataSource} from 'typeorm'
import {DATA_SOURCE} from "../config/constants";
import {User} from "./model/user.entity";

export const databaseProviders = [
    {
        provide: DATA_SOURCE,
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                url: environmentConfig.dbUrl,
                entities: [User], // TODO mieux avec un chemin qui prend tout les fichiers .entity.ts mais je n'ai pas réussi à le faire fonctionner
                synchronize: true,
            });
            return dataSource.initialize();
        }
    }
];
