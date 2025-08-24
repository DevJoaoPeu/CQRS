import { Query } from "@nestjs/cqrs";
import { ProductEntity } from "src/products/entities/product.entity";

export class GetProductsQuery extends Query<ProductEntity[]>{}