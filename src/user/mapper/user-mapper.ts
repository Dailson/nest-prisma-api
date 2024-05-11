import {
  Mapper,
  createMap,
  forMember,
  ignore,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UserCreateDTO } from '../dto/user-create.dto';
import { UserReadDTO } from '../dto/user-read.dto';
import { UserUpdateDTO } from '../dto/user-update.dto';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        UserEntity,
        UserReadDTO,
        forMember(
          (destination) => destination.fullName,
          mapFrom((source) => source.name + ' ' + source.last_name),
        ),
      );
      createMap(mapper, UserCreateDTO, UserEntity);
      createMap(
        mapper,
        UserUpdateDTO,
        UserEntity,
        forMember((destination) => destination.password, ignore()),
      );
    };
  }
}
