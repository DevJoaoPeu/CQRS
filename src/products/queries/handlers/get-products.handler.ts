import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProductsQuery } from "../impl/get-products.query";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductReadingEntity } from "src/products/entities/product-reading.entity";
import { Repository } from "typeorm";

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(
    @InjectRepository(ProductReadingEntity)
    private readonly productEntity: Repository<ProductReadingEntity>,
  ) {}

  async execute(query: GetProductsQuery): Promise<ProductReadingEntity[]> {
    return this.productEntity.find();
  }
}