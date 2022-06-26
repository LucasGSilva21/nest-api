import { Controller, Get, Param } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get('/users/:id')
  async findAllByUser(@Param('id') userId: string) {
    return await this.salesService.findAllByUser(userId);
  }
}
