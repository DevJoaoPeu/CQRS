import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { CreateProductHandler } from './comands/handlers/create-product.handler';
import { GetProductsHandler } from './queries/handlers/get-products.handler';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), CqrsModule.forRoot()],
  providers: [GetProductsHandler, CreateProductHandler],
  controllers: [ProductsController]
})
export class ProductsModule {}
