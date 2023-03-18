import { PartialType } from '@nestjs/mapped-types';
import { CreateRiderDto } from './create-rider.dto';
import { IsAlpha, IsInt, Length, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRiderDto extends PartialType(CreateRiderDto) {
  @ApiProperty({ default: 'Aime Ndayambaje' })
  @Length(5, 20)
  @IsAlpha(undefined, { message: 'This is not a valid name' })
  name?: string;

  @ApiProperty({ default: 5 })
  @IsInt()
  @Max(10)
  @Min(2)
  experience?: number;
}
