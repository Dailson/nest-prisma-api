import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // First Step: Find a single user with the given email. If no user is found, throw a NotFoundException
    const user = await this.userService.findOneByEmail(email);

    // Second Step: Verity if the password is correct
    const isPasswordValid = user.password === password;

    // If password dos not match, throw an erro
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Third Step: Generate a JWT containing the user's ID and return it
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
