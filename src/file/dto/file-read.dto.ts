import { AutoMap } from '@automapper/classes';
import { User } from '@prisma/client';

export class FileReadDTO {
  @AutoMap()
  id: number;

  @AutoMap()
  fileName: string;

  @AutoMap()
  contentLength: number;

  @AutoMap()
  contentType: string;

  @AutoMap()
  url: string;

  @AutoMap()
  user: User;
}
