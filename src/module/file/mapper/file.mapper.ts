/* istanbul ignore file */
import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { FileReadDTO } from '../dto/file-read.dto';
import { FileEntity } from '../entity/file.entity';

@Injectable()
export class FileProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, FileEntity, FileReadDTO);
    };
  }
}
