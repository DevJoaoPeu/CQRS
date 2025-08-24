import { Command } from "@nestjs/cqrs";
import { ProductEntity } from "src/products/entities/product.entity";

export class CreateProductCommand extends Command<
  ProductEntity
>{
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly active: boolean
  ) {
    super()
  }
}