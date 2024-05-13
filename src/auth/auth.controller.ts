import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { AuthEntity } from './entity/auth.entity';

@Controller({ path: 'auth' })
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Authenticate a user' })
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() loginDTO: LoginDTO): Promise<AuthEntity> {
    return await this.authService.login(loginDTO.email, loginDTO.password);
  }
}
