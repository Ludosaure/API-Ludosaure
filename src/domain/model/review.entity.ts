import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    rating: number;

    @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    comment: string;
}