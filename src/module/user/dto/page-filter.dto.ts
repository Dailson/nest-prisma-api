export class PageFilterDTO {
  // @Transform(({ value }) => parseInt(value, 1))
  // @ApiProperty()
  // @IsInt()
  // @IsOptional()
  page?: number;

  // @Transform(({ value }) => parseInt(value, 10))
  // @IsInt()
  // @ApiProperty()
  // @IsOptional()
  size?: number;
}
