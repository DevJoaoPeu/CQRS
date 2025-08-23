import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from './comands/impl/create-product.command';
import { GetProductsQuery } from './queries/impl/get-products.query';
import { CreateProductsDto } from './queries/dto/create-products.dto';

@Controller('products')
export class ProductsController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @Inject(QueryBus)
  private readonly queryBus: QueryBus;

  @Post('create')
  async create(@Body() body: CreateProductsDto) {
    return this.commandBus.execute(
      new CreateProductCommand(body.name, body.price, body.active),
    );
  }

  @Get('get')
  async findAll() {
    return this.queryBus.execute(new GetProductsQuery());
  }
}
