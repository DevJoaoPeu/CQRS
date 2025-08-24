import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('product_reading')
export class ProductReadingEntity {
    @PrimaryColumn({ name: 'id', type: 'int' })
    id: number;

    @Column({ name: 'name', type: 'varchar' })
    name: string

    @Column({ name:'price', type: 'int' })
    price: number;

    @Column({ name: 'active', type: 'boolean' })
    active: boolean;
}