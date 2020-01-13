import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// tslint:disable-next-line: max-line-length
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiExtraModels, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import ApiParameters from '../../annotations/api-parameters';
import userId from '../users/models/user-id';
import { CatCreateDto } from './models/animals/cat-create.dto';
import { CatUpdateDto } from './models/animals/cat-update.dto';
import { CatDto } from './models/animals/cat.dto';
import { DogCreateDto } from './models/animals/dog-create.dto';
import { DogUpdateDto } from './models/animals/dog-update.dto';
import { DogDto } from './models/animals/dog.dto';
import { HamsterCreateDto } from './models/animals/hamster-create.dto';
import { HamsterUpdateDto } from './models/animals/hamster-update.dto';
import { HamsterDto } from './models/animals/hamster.dto';
import { RabbitCreateDto } from './models/animals/rabbit-create.dto';
import { RabbitUpdateDto } from './models/animals/rabbit-update.dto';
import { RabbitDto } from './models/animals/rabbit.dto';
import PetCreateDto from './models/pet-create.dto';
import PetDetailedDto from './models/pet-detailed.dto';
import petId from './models/pet-id';
import PetPathParaneters from './models/pet-path-parameters';
import PetUpdateDto from './models/pet-update.dto';
import PetDto from './models/pet.dto';
import PetsService from './pets.service';

@ApiTags('pets')
@ApiBearerAuth()
@Controller('users/:userId/pets')
@UseGuards(AuthGuard())
export default class PetsController {
  constructor(private readonly petsService: PetsService) { }

  @Get()
  @ApiExtraModels(CatDto, DogDto, HamsterDto, RabbitDto)
  @ApiOkResponse({ description: 'Returns a list of pets', type: [PetDto] })
  @ApiUnauthorizedResponse({ description: 'Invalid Authorization header' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({
    description: 'user id',
    name: 'userId',
    type: String,
  })
  getPets(@Param('userId') uId: userId): PetDto[] {
    return this.petsService.getPetsForUsers(uId);
  }

  @Get(':id')
  @ApiExtraModels(CatDto, DogDto, HamsterDto, RabbitDto)
  @ApiOkResponse({ description: 'Returns a pet', type: PetDetailedDto })
  @ApiUnauthorizedResponse({ description: 'Invalid Authorization header' })
  @ApiNotFoundResponse({ description: 'User or Pet not found' })
  @ApiParameters(PetPathParaneters)
  getPet(@Param('userId') uId: userId, @Param('id') id: petId): PetDetailedDto {
    return this.petsService.getPet(uId, id);
  }

  @Post()
  @ApiExtraModels(CatCreateDto, DogCreateDto, HamsterCreateDto, RabbitCreateDto)
  @ApiCreatedResponse({ description: 'Creates a pet', type: PetDetailedDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Invalid Authorization header' })
  @ApiNotFoundResponse({ description: 'User or Pet not found' })
  @ApiParam({
    description: 'user id',
    name: 'userId',
    type: String,
  })
  @ApiBody({
    schema: {
      oneOf: [
        {$ref: '#/components/schemas/CatCreateDto'},
        {$ref: '#/components/schemas/DogCreateDto'},
        {$ref: '#/components/schemas/HamsterCreateDto'},
        {$ref: '#/components/schemas/RabbitCreateDto'},
      ],
    },
  })
  createPet(@Param('userId') uId: userId, @Body() pet: PetCreateDto): PetDetailedDto {
    return this.petsService.addPet(uId, pet);
  }

  @Put(':id')
  @ApiExtraModels(CatUpdateDto, DogUpdateDto, HamsterUpdateDto, RabbitUpdateDto)
  @ApiOkResponse({ description: 'Updates a pet', type: PetDetailedDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Invalid Authorization header' })
  @ApiNotFoundResponse({ description: 'User or Pet not found' })
  @ApiParameters(PetPathParaneters)
  @ApiBody({
    schema: {
      oneOf: [
        {$ref: '#/components/schemas/CatUpdateDto'},
        {$ref: '#/components/schemas/DogUpdateDto'},
        {$ref: '#/components/schemas/HamsterUpdateDto'},
        {$ref: '#/components/schemas/RabbitUpdateDto'},
      ],
    },
  })
  updatePet(@Param('userId') uId: userId, @Param('id') id: petId, @Body() pet: PetUpdateDto): PetDetailedDto {
    return this.petsService.updatePet(uId, id, pet);
  }

  @Delete(':id')
  @ApiExtraModels(CatDto, DogDto, HamsterDto, RabbitDto)
  @ApiOkResponse({ description: 'Deletes a pet', type: PetDetailedDto })
  @ApiUnauthorizedResponse({ description: 'Invalid Authorization header' })
  @ApiNotFoundResponse({ description: 'User or Pet not found' })
  @ApiParameters(PetPathParaneters)
  deletePet(@Param('userId') uId: userId, @Param('id') id: petId): PetDetailedDto {
    return this.petsService.removePet(uId, id);
  }
}
