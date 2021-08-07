import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationResponseDto } from 'src/common/dto/response.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountRequestDto extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateAccountResponseDto extends MutationResponseDto {}
