import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { LoginRequestDTO } from './dto/login-request.dto';
import { AuthEntity } from './entity/auth.entity';

@Controller({ path: 'auth' })
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @Public()
  @ApiOperation({ summary: 'Authenticate a user' })
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() loginDTO: LoginRequestDTO): Promise<AuthEntity> {
    return await this.authService.login(loginDTO.email, loginDTO.password);
  }
}
