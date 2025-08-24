import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductReadingEntity } from "src/products/entities/product-reading.entity";
import { Repository } from "typeorm";
import { ProductEvent } from "../impl/product.event";

@EventsHandler(ProductEvent)
export class ProductHandler implements IEventHandler<ProductEvent> {
    constructor(
        @InjectRepository(ProductReadingEntity)
        private readonly productReading: Repository<ProductReadingEntity>
    ) {}

    async handle(event: ProductEvent) {
        const { id, active, name, price } = event

        const productRead = await this.productReading.create({
            name,
            price,
            active
        })

        await this.productReading.save(productRead)
    }
}