import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';

export class CreatePollDto {
  @ApiProperty({
    description: 'The topic of the poll',
    example: 'Best programming language',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  topic: string;

  @ApiProperty({
    description: 'The number of votes each voter can cast',
    example: 3,
    minimum: 1,
    maximum: 5,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  votesPerVoter: number;

  @ApiProperty({
    description: 'The name of the poll creator',
    example: 'John Doe',
    maxLength: 25,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 25)
  name: string;
}
