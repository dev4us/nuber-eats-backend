import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateAccountRequestDto,
  CreateAccountResponseDto,
} from './dto/create-account.dto';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((_) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((_) => Boolean)
  hi() {
    return true;
  }

  @Mutation((returnType) => CreateAccountResponseDto)
  async createAccount(
    @Args('input') params: CreateAccountRequestDto,
  ): Promise<CreateAccountResponseDto> {
    try {
      const { ok, error } = await this.usersService.createAccount(params);

      return { ok, error };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Mutation((returnType) => LoginResponseDto)
  async login(
    @Args('input') params: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    try {
      return this.usersService.login(params);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Query((returnType) => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: User) {
    return authUser;
  }
}
