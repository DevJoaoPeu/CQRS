import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductWritingEntity } from './entities/product-writing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { CreateProductHandler } from './comands/handlers/create-product.handler';
import { GetProductsHandler } from './queries/handlers/get-products.handler';
import { ProductReadingEntity } from './entities/product-reading.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductWritingEntity, ProductReadingEntity]), CqrsModule.forRoot()],
  providers: [GetProductsHandler, CreateProductHandler],
  controllers: [ProductsController]
})
export class ProductsModule {}
