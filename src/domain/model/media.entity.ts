import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Media {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    public url: string;

    @Column()
    public key: string;
}
