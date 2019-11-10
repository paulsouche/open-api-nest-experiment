import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
// tslint:disable-next-line: max-line-length
import { ApiBadRequestResponse, ApiCreatedResponse, ApiExtraModels, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiUseTags } from '@nestjs/swagger';
import ApiParameters from '../annotations/api-parameters';
import { CatDto } from '../models/pets/animals/cat.dto';
import { DogDto } from '../models/pets/animals/dog.dto';
import { HamsterDto } from '../models/pets/animals/hamster.dto';
import { RabbitDto } from '../models/pets/animals/rabbit.dto';
import PetCreateDto from '../models/pets/pet-create.dto';
import PetDetailedDto from '../models/pets/pet-detailed.dto';
import petId from '../models/pets/pet-id';
import PetPathParaneters from '../models/pets/pet-path-parameters';
import PetUpdateDto from '../models/pets/pet-update.dto';
import PetDto from '../models/pets/pet.dto';
import userId from '../models/users/user-id';
import PetsService from '../services/pets.service';

@ApiUseTags('pets')
@Controller('users/:userId/pets')
export default class PetsController {
  constructor(private readonly petsService: PetsService) { }

  @Get()
  @ApiOkResponse({ description: 'Returns a list of pets', type: [PetDto] })
  @ApiExtraModels(CatDto, DogDto, HamsterDto, RabbitDto)
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
  @ApiOkResponse({ description: 'Returns a pet', type: PetDetailedDto })
  @ApiNotFoundResponse({ description: 'User or Pet not found' })
  @ApiParameters(PetPathParaneters)
  getPet(@Param('userId') uId: userId, @Param('id') id: petId): PetDetailedDto {
    return this.petsService.getPet(uId, id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Creates a pet', type: PetDetailedDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'User or Pet not found' })
  @ApiParam({
    description: 'user id',
    name: 'userId',
    type: String,
  })
  createPet(@Param('userId') uId: userId, @Body() pet: PetCreateDto): PetDetailedDto {
    return this.petsService.addPet(uId, pet);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updates a pet', type: PetDetailedDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'User or Pet not found' })
  @ApiParameters(PetPathParaneters)
  updatePet(@Param('userId') uId: userId, @Param('id') id: petId, @Body() pet: PetUpdateDto): PetDetailedDto {
    return this.petsService.updatePet(uId, id, pet);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deletes a pet', type: PetDetailedDto })
  @ApiNotFoundResponse({ description: 'User or Pet not found' })
  @ApiParameters(PetPathParaneters)
  deletePet(@Param('userId') uId: userId, @Param('id') id: petId): PetDetailedDto {
    return this.petsService.removePet(uId, id);
  }
}
