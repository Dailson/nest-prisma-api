import { AutoMap } from '@automapper/classes';
import { File } from '@prisma/client';
export class FileEntity implements File {
  @AutoMap()
  id: number;

  originalName: string;

  @AutoMap()
  fileName: string;

  @AutoMap()
  contentLength: number;

  @AutoMap()
  contentType: string;

  @AutoMap()
  userId: number;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
