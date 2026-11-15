import { IsString, MinLength, IsNumber, IsBoolean, IsIn, IsDateString, IsOptional } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @MinLength(2, { message: 'Judul minimal 2 karakter' })
  title: string;

  @IsString()
  @IsIn(['RPG', 'Horror', 'Action', 'Adventure', 'Puzzle'], {
    message: 'Genre harus salah satu dari: RPG, Horror, Action, Adventure, Puzzle',
  })
  genre: string;

  @IsNumber()
  rating: number;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @IsDateString()
  releaseDate: string;
}