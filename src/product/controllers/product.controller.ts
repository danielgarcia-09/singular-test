import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FindManyOptions } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

@ApiBearerAuth()
@ApiTags('product')
@Controller('product')
export class ProductController {

    constructor(
        private productService: ProductService
    ) { }

    @ApiOperation({ summary: 'Get all products' })
    @ApiQuery({ name: 'filter', required: false, example: { where: { name: 'product name' } } })
    @Get('list')
    async findAll(
        @Query('filter') filter?: FindManyOptions<Product>
    ) {
        const formattedFilter = filter ? JSON.parse(filter as string) : {};

        return this.productService.findAll(formattedFilter);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Add product' })
    @Post('add')
    async create(
        @Body() data: CreateProductDto
    ) {
        return this.productService.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update product by id' })
    @Put('update/:id')
    async update(
        @Param('id') id: number,
        @Body() data: UpdateProductDto
    ) {
        return this.productService.update(id, data);
    }
}
