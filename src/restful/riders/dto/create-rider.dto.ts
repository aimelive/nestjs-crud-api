import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsInt, Length, Max, Min } from 'class-validator';

export class CreateRiderDto {
  @ApiProperty({ default: 'Aime Ndayambaje' })
  @Length(5, 20)
  @IsAlpha(undefined, { message: 'This is not a valid name' })
  name: string;

  @ApiProperty({ default: 5 })
  @IsInt()
  @Max(10)
  @Min(2)
  experience: number;
}
