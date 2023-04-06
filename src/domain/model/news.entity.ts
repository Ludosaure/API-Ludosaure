import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class News {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, name: 'start_date'})
    startDate: Date;

    @Column({nullable: false, name: 'end_date'})
    endDate: Date;
}
