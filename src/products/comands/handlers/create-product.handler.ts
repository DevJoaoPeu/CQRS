import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateProductCommand } from "../impl/create-product.command";
import { ProductEntity } from "src/products/entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
  ) {}

  async execute(command: CreateProductCommand): Promise<ProductEntity> {
    const { name, price, active } = command;
    const product = this.productEntity.create({ name, price, active });
    return this.productEntity.save(product);
  }
}