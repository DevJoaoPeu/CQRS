import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from './comands/impl/create-product.command';
import { GetProductsQuery } from './queries/impl/get-products.query';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  async create(@Body() body: { name: string; price: number, active: boolean }) {
    return this.commandBus.execute(
      new CreateProductCommand(body.name, body.price, body.active),
    );
  }

  @Get('get')
  async findAll() {
    return this.queryBus.execute(new GetProductsQuery());
  }
}
