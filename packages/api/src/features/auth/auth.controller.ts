import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiExtraModels, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import AuthService from './auth.service';
import CredentialsDto from './models/credentials.dto';
import DeserialiwedJwtDto from './models/deserialiwed.jwt.dto';
import JwtDto from './models/jwt.dto';

@ApiTags('auth')
@Controller('login')
export default class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @ApiExtraModels(DeserialiwedJwtDto)
  @ApiCreatedResponse({ description: 'Returns a jwt', type: [JwtDto] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  login(@Body() credentials: CredentialsDto): Promise<JwtDto> {
    return this.authService.login(credentials);
  }
}
