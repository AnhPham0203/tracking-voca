import { IsNotEmpty, IsString } from 'class-validator';

export class AnalyzeSentenceDto {
  @IsNotEmpty()
  @IsString()
  sentence: string;
}
