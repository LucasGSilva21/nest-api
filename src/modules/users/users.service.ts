import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CryptographyHelper } from '../../shared/helpers/cryptography.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly cryptographyHelper: CryptographyHelper,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (user) {
      throw new BadRequestException(`User with email ${email} already exists`);
    }

    const hashPassword = await this.cryptographyHelper.hash(password);

    const newUser = this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    const { id } = await this.usersRepository.save(newUser);

    return { id };
  }

  async findOneByCriteria(criteria: Partial<User>): Promise<User> {
    return this.usersRepository.findOne({ where: criteria as any });
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }
    await this.usersRepository.delete(id);
  }
}
