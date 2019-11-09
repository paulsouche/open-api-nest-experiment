import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiUseTags } from '@nestjs/swagger';
import ApiParameters from '../annotations/api-parameters';
import PetCreateDto from '../models/pets/pet-create.dto';
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
  @ApiOkResponse({ description: 'Returns a pet', type: PetDto })
  @ApiNotFoundResponse({ description: 'User or Pet not found' })
  @ApiParameters(PetPathParaneters)
  getPet(@Param('userId') uId: userId, @Param('id') id: petId): PetDto {
    return this.petsService.getPet(uId, id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Creates a pet', type: PetDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'User or Pet not found' })
  @ApiParam({
    description: 'user id',
    name: 'userId',
    type: String,
  })
  createPet(@Param('userId') uId: userId, @Body() pet: PetCreateDto): PetDto {
    return this.petsService.addPet(uId, pet);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updates a pet', type: PetDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'User or Pet not found' })
  @ApiParameters(PetPathParaneters)
  updatePet(@Param('userId') uId: userId, @Param('id') id: petId, @Body() pet: PetUpdateDto): PetDto {
    return this.petsService.updatePet(uId, id, pet);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deletes a pet', type: PetDto })
  @ApiNotFoundResponse({ description: 'User or Pet not found' })
  @ApiParameters(PetPathParaneters)
  deletePet(@Param('userId') uId: userId, @Param('id') id: petId): PetDto {
    return this.petsService.removePet(uId, id);
  }
}
