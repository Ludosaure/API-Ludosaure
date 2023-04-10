import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class News {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //TODO définir champs avec les gars

    @Column({nullable: false, name: 'start_date'})
    startDate: Date;

    @Column({nullable: false, name: 'end_date'})
    endDate: Date;
}
