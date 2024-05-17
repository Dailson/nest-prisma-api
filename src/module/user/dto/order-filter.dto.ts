import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ApplicationConstants } from '../../../const/page-constant';

export class OrderFilterDTO {
  @ApiProperty({
    name: 'orderBy',
    default: ApplicationConstants.DEFAULT_ORDER_BY,
    required: false,
  })
  @IsOptional()
  @IsString()
  @AutoMap()
  orderBy?: string = ApplicationConstants.DEFAULT_ORDER_BY;

  @ApiProperty({
    name: 'direction',
    default: ApplicationConstants.DEFAULT_SORT_DIRECTION,
    required: false,
  })
  @IsOptional()
  @IsString()
  @AutoMap()
  direction?: string = ApplicationConstants.DEFAULT_SORT_DIRECTION;
}
