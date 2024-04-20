import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsPositive, IsString } from "class-validator";
import { ProductStatus } from "src/constants";

export class CreateProductDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsPositive()
    @IsNotEmpty()
    price: number;

    @ApiProperty({type: 'enum', enum: ProductStatus})
    @IsEnum(ProductStatus, { each: true })
    status: ProductStatus;
}
