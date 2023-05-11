import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Media } from "./media.entity";

@Entity()
export class News {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, name: 'end_date'})
    endDate: Date;

    @OneToOne(() => Media, media => media.id, {nullable: true})
    @JoinColumn({name: 'picture_id'})
    picture: Media;
}
