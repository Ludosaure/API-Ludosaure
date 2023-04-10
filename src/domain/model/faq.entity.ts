import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Faq {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, unique: true})
    question: string;

    @Column({nullable: false, unique: true})
    answer: string;
}
