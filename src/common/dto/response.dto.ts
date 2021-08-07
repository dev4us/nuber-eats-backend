import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MutationResponseDto {
  @Field((type) => String, { nullable: true })
  error?: string;

  @Field((type) => Boolean)
  ok: boolean;
}
