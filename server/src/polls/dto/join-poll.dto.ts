import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class JoinPollDto {
  @ApiProperty({
    description: 'The unique identifier of the poll to join',
    example: '123456',
    maxLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  pollId: string;

  @ApiProperty({
    description: 'The name of the user joining the poll',
    example: 'Jane Doe',
    maxLength: 25,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 25)
  name: string;
}
