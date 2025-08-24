import { Command } from "@nestjs/cqrs";
import { ProductWritingEntity } from "src/products/entities/product-writing.entity";

export class ProductEvent extends Command<
  ProductWritingEntity
>{
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number,
    public readonly active: boolean
  ) {
    super()
  }
}