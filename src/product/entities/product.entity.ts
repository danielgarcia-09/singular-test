import { ProductStatus } from "src/constants";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'decimal', precision: 5, scale: 2})
    price: number;

    @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.ACTIVE})
    status: ProductStatus;
}
