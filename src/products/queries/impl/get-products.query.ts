import { Query } from "@nestjs/cqrs";
import { ProductWritingEntity } from "src/products/entities/product-writing.entity";

export class GetProductsQuery extends Query<ProductWritingEntity[]>{}