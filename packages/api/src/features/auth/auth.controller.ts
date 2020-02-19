import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiExtraModels, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Response } from 'express';
import AuthService from './auth.service';
import CredentialsDto from './models/credentials.dto';
import DeserialiwedJwtDto from './models/deserialized.jwt.dto';
import JwtDto from './models/jwt.dto';

@ApiTags('auth')
@Controller('login')
export default class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @ApiExtraModels(DeserialiwedJwtDto)
  @ApiCreatedResponse({ description: 'Returns a jwt', type: JwtDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(@Body() credentials: CredentialsDto, @Res() res: Response): Promise<void> {
    const [dto, refreshToken] = await this.authService.login(credentials);

    res.cookie('refresh-cookie', refreshToken, {
      httpOnly: true,
      path: '/refresh-token',
      secure: true,
    });

    return  res.status(201).send(dto).end();
  }
}
