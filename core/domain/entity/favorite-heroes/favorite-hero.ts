import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class FavoriteHero {
  @IsInt()
  marvelId: number;

  @IsString()
  @IsNotEmpty()
  reason: string;
}