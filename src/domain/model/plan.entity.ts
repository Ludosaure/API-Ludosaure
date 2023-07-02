import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Plan {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, unique: true})
    name: string;

    @Column({nullable: false, unique: true, type: 'int'})
    reduction: number;

    @Column({nullable: false, unique: true, name: 'nb_weeks', type: 'int'})
    nbWeeks: number;

    @Column({nullable: false, name: 'is_active', type: 'boolean', default: true})
    isActive: boolean;
}
