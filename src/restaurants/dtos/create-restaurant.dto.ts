import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

@ArgsType()
export class createRestaurantDto {
  @Field((_) => String)
  @IsString()
  @Length(5, 10)
  name: string;

  @IsBoolean()
  @Field((_) => Boolean)
  isVegan: boolean;

  @IsString()
  @Field((_) => String)
  address: string;

  @IsString()
  @Field((_) => String)
  ownersName: string;
}
