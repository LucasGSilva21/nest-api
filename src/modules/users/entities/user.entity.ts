import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { compareSync } from 'bcrypt';
import { UserRoleType } from './userRole.type';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'varchar', length: 60 })
  @Index({ unique: true })
  email: string;

  @Column({ type: 'varchar', length: 60 })
  password: string;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: true,
    name: 'previous_password',
  })
  previousPassword?: string;

  @Column({ type: 'enum', enum: UserRoleType, default: UserRoleType.User })
  role: UserRoleType;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  validatePassword(password: string): boolean {
    return compareSync(password, this.password);
  }

  validatePreviousPassword(previousPassword: string): boolean {
    return compareSync(previousPassword, this.previousPassword);
  }
}
