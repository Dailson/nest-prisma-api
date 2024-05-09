import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UserCreateDTO } from '../dto/user-create.dto';
import { UserReadDTO } from '../dto/user-read.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, User, UserReadDTO);
      createMap(mapper, UserCreateDTO, User);
    };
  }
}
