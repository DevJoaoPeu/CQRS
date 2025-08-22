import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { CreateProductHandler } from './comands/handlers/create-product.handler';
import { GetProductsHandler } from './queries/handlers/get-products.handler';

export const CommandHandlers = [CreateProductHandler];
export const QueryHandlers = [GetProductsHandler];

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), CqrsModule],
  providers: [...CommandHandlers, ...QueryHandlers],
  controllers: [ProductsController]
})
export class ProductsModule {}
