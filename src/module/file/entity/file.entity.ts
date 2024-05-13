import { AutoMap } from '@automapper/classes';
import { File } from '@prisma/client';
export class FileEntity implements File {
  @AutoMap()
  id: number;

  @AutoMap()
  file_name: string;

  @AutoMap()
  content_length: number;

  @AutoMap()
  content_type: string;

  @AutoMap()
  url: string;

  @AutoMap()
  user_id: number;

  @AutoMap()
  created_at: Date;

  @AutoMap()
  updated_at: Date;
}
