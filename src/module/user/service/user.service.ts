import { Injectable } from '@nestjs/common';
import { genSalt, hashSync } from 'bcrypt';
import { PrismaService } from '../../../config/prisma/prisma.service';
import { PageResponseDTO } from '../dto/page-response.dto';
import { UserCreateDTO } from '../dto/user-create.dto';
import { UserUpdateDTO } from '../dto/user-update.dto';
import { UserEntity } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UserRepository,
  ) {}

  async create(userEntity: UserCreateDTO): Promise<void> {
    userEntity.password = await this.hashPassword(userEntity.password);
    this.userRepository.create(userEntity);
  }

  async fetchAll(): Promise<UserEntity[] | undefined[]> {
    return await this.userRepository.fetchAll();
  }

  async fetchById(userId: number): Promise<UserEntity> {
    return await this.userRepository.fetchById(userId);
  }

  async fetchByEmail(userEmail: string): Promise<UserEntity> {
    return await this.userRepository.fetchByEmail(userEmail);
  }

  async fetchAllPaged(
    page?: number,
    size?: number,
  ): Promise<PageResponseDTO<UserEntity>> {
    return await this.userRepository.fetchAllPaged(page, size);
  }

  async update(userId: number, userUpdateDTO: UserUpdateDTO) {
    return await this.userRepository.update(userId, userUpdateDTO);
  }

  async delete(userId: number) {
    await this.userRepository.delete(userId);
  }

  private async hashPassword(password: string): Promise<string> {
    return hashSync(password, await genSalt(10));
  }
}
