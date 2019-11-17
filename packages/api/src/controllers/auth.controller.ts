import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiUnauthorizedResponse, ApiUseTags } from '@nestjs/swagger';
import CredentialsDto from '../models/auth/credentials.dto';
import JwtDto from '../models/auth/jwt.dto';
import AuthService from '../services/auth.service';

@ApiUseTags('auth')
@Controller('login')
export default class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @ApiCreatedResponse({ description: 'Returns a jwt', type: [JwtDto] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  login(@Body() credentials: CredentialsDto): Promise<JwtDto> {
    return this.authService.login(credentials);
  }
}
