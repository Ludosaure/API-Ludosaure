import {DataSource} from "typeorm";
import * as process from "process";

export const appDataSource = new DataSource({
    type: "postgres",
    host: process.env.RDS_HOSTNAME,
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: Number(process.env.RDS_PORT),
    // TODO url, entities, autoLoadEntities, synchronize, ssl, ...
});

appDataSource.initialize();
