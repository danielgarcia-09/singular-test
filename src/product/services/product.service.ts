import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) { }

    async findAll(filter?: FindManyOptions<Product>): Promise<Product[]> {
        return this.productRepository.find(filter);
    }

    async findById(id: number): Promise<Product> {
        return this.productRepository.findOne({ where: { id } });
    }

    async findOne(filter: FindManyOptions<Product>): Promise<Product> {
        return this.productRepository.findOne(filter);
    }

    async create(data: Partial<Product>): Promise<Product> {
        const product = this.productRepository.create(data);

        return this.productRepository.save(product);
    }

    async update(id: number, data: Partial<Product>): Promise<Product> {
        const product = await this.productRepository.preload({
            id,
            ...data
        });

        if(!product) {
            throw new Error('Product not found');
        }

        return this.productRepository.save(product);
    }

    async remove(id: number): Promise<void> {
        const product = await this.findById(id);
        
        if(!product) {
            throw new Error('Product not found');
        }

        await this.productRepository.remove(product);
    }
}
