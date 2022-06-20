import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationOptions } from '../../shared/types/pagination.types';
import { calculateOffset } from '../../shared/helpers/pagination.helper';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productsRepository.create(createProductDto);

    const { id } = await this.productsRepository.save(newProduct);

    return { id };
  }

  async findAll(options: PaginationOptions) {
    const { page, perPage } = options;

    const [result, total] = await this.productsRepository.findAndCount({
      take: perPage,
      skip: calculateOffset(page, perPage),
    });

    return {
      data: result,
      count: total,
    };
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new BadRequestException(`Product with id ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new BadRequestException(`Product with id ${id} not found`);
    }

    return this.productsRepository.save({ id, ...updateProductDto });
  }

  async remove(id: string) {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new BadRequestException(`Product with id ${id} not found`);
    }

    await this.productsRepository.delete(id);
  }
}
