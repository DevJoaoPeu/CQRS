import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateProductCommand } from "../impl/create-product.command";
import { ProductWritingEntity } from "src/products/entities/product-writing.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEvent } from "src/products/events/impl/product.event";

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    @InjectRepository(ProductWritingEntity)
    private readonly productEntity: Repository<ProductWritingEntity>,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateProductCommand): Promise<ProductWritingEntity> {
    const saved = await this.productEntity.save(command);
    const { id, active, name, price } = saved

    this.eventBus.publish(new ProductEvent(id, name, price, active))

    return saved
  }
}