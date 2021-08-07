import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationResponseDto } from 'src/common/dto/response.dto';
import { User } from '../entities/user.entity';

@InputType()
export class LoginRequestDto extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginResponseDto extends MutationResponseDto {
  @Field((type) => String, { nullable: true })
  token?: string;
}
