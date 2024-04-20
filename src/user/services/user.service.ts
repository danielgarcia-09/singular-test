import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Not, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async findAll(filter?: FindManyOptions<User>): Promise<User[]> {
        return this.userRepository.find(filter);
    }

    async findById(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findOne(Filter: FindManyOptions<User>): Promise<User> {
        return this.userRepository.findOne(Filter);
    }

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } });
    }

    async create(data: Partial<User>): Promise<User> {
        const user = this.userRepository.create(data);

        return this.userRepository.save(user);
    }

    async update(id: number, data: Partial<User>): Promise<User> {
        const user = await this.userRepository.preload({ id, ...data });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.userRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        const user = await this.findById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.userRepository.remove(user);
    }
}
