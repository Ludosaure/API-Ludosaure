import { DataSource } from 'typeorm';
import { User } from '../database/model/user.entity';
import {DATA_SOURCE, USER_REPOSITORY} from "../config/constants";

export const userProviders = [
    {
        provide: USER_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: [DATA_SOURCE],
    },
];
