import { Command } from "@nestjs/cqrs";
import { ProductWritingEntity } from "src/products/entities/product-writing.entity";

export class CreateProductCommand extends Command<
  ProductWritingEntity
>{
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly active: boolean
  ) {
    super()
  }
}