import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field((_) => Number)
  id: number;

  @Field((_) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((_) => Boolean, { nullable: true })
  @Column({ default: true })
  @IsOptional()
  @IsBoolean()
  isVegan?: boolean;

  @Field((_) => String)
  @Column()
  @IsString()
  address: string;

  @Field((_) => String)
  @Column()
  @IsString()
  ownersName: string;

  @Field((_) => String, { defaultValue: '강남' })
  @Column()
  @IsString()
  categoryName: string;
}
