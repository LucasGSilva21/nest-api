import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
    private usersService: UsersService,
  ) {}

  async findAllByUser(userId: string): Promise<Sale[]> {
    const user = await this.usersService.findOneByCriteria({
      id: userId,
    });

    if (!user) {
      throw new BadRequestException(`User with id ${userId} not found`);
    }

    return this.salesRepository.find({ where: { user: { id: user.id } } });
  }
}
