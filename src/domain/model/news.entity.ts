import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class News {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, name: 'picture_path'})
    picturePath: string;

    @Column({nullable: false, name: 'end_date'})
    endDate: Date;
}
