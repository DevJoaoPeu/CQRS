import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProductsQuery } from "../impl/get-products.query";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/products/entities/product.entity";
import { Repository } from "typeorm";

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
  ) {}

  async execute(query: GetProductsQuery): Promise<ProductEntity[]> {
    return this.productEntity.find();
  }
}