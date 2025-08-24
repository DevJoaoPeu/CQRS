import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateProductCommand } from "../impl/create-product.command";
import { ProductWritingEntity } from "src/products/entities/product-writing.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    @InjectRepository(ProductWritingEntity)
    private readonly productEntity: Repository<ProductWritingEntity>,
  ) {}

  async execute(command: CreateProductCommand): Promise<ProductWritingEntity> {
    const { name, price, active } = command;
    const product = this.productEntity.create({ name, price, active });
    return this.productEntity.save(product);
  }
}