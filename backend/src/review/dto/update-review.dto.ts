import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class UpdateReviewDto {
  @IsNotEmpty()
  @IsString()
  wordId: string;

  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;
}
