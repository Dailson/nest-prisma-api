import { AutoMap } from '@automapper/classes';

export class FileReadDTO {
  @AutoMap()
  id: number;

  @AutoMap()
  fileName: string;
}
