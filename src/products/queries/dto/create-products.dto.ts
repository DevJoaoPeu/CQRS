import { IsNumber, IsString } from "class-validator";

export class CreateProductsDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;
    
    active: boolean;
}