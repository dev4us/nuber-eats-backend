import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountRequestDto } from './dto/create-account.dto';
import { LoginRequestDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountRequestDto): Promise<{ ok: boolean; error?: string }> {
    // S1. check that Email does not exist
    // S2. create User & Hash the password
    try {
      const exists = await this.users.findOne({ email });

      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
      }

      await this.users.save(this.users.create({ email, password, role }));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Couldn't create Account" };
    }
  }

  async login({ email, password }: LoginRequestDto): Promise<{
    ok: boolean;
    error?: string;
    token?: string;
  }> {
    // S1. find the user with the email
    // S2. check if the password is correct
    // S3. make a JWT and give it to the user
    try {
      const user = await this.users.findOne({ email });

      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      const isPasswordCorrect = await user.checkPassword(password);

      if (!isPasswordCorrect) {
        return {
          ok: false,
          error: 'Wrong Password',
        };
      }

      const token = this.jwtService.sign(user.id);

      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findById(id: number): Promise<User> {
    return this.users.findOne({ id });
  }
}
