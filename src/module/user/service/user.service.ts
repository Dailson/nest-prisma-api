import { Injectable } from '@nestjs/common';
import { genSalt, hashSync } from 'bcrypt';
import { PrismaService } from '../../../prisma/prisma.service';
import { FileService } from '../../file/file.service';
import { PageResponseDTO } from '../dto/page-response.dto';
import { UserEntity } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
    private readonly userRepository: UserRepository,
  ) {}

  async create(userEntity: UserEntity): Promise<void> {
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

  async update(userId: number, userData: any) {
    return await this.userRepository.update(userId, userData);
  }

  async delete(userId: number) {
    await this.userRepository.delete(userId);
  }

  async uploadPicture(file: Express.Multer.File, request: any) {
    const [fileUploaded] = await this.fileService.upload(file, request);
    await this.update(request.user.id, {
      pictureUrl: fileUploaded.fileName,
    });
  }

  async downloadPicture(pictureName: string) {
    return await this.fileService.download(pictureName);
  }

  private async hashPassword(password: string): Promise<string> {
    return hashSync(password, await genSalt(10));
  }
}
