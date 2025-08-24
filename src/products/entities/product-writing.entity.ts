import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('product_writing')
export class ProductWritingEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @Column({ name: 'name', type: 'varchar' })
    name: string

    @Column({ name:'price', type: 'int' })
    price: number;

    @Column({ name: 'active', type: 'boolean' })
    active: boolean;
}