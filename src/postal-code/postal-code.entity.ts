import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('postal_code')
export class PostalCode {

    @PrimaryColumn('char', { length: 4, name: 'cPostalCode' })
    code: string;

    @Column('varchar', { length: 20, name: 'cTownName' })
    town: string;
}