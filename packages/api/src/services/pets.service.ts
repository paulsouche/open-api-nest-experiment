import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import PetCreateDto from '../models/pets/pet-create.dto';
import PetDetailedDto from '../models/pets/pet-detailed.dto';
import petId from '../models/pets/pet-id';
import PetUpdateDto from '../models/pets/pet-update.dto';
import PetDto from '../models/pets/pet.dto';
import userId from '../models/users/user-id';
import UserDto from '../models/users/user.dto';
import PetsRepository from '../repositories/pets.repository';
import UsersService from './users.service';

interface PetAndUser {
  pet: PetDto;
  user: UserDto;
}

@Injectable()
export default class PetsService {

  constructor(private readonly usersService: UsersService, private readonly petsRepository: PetsRepository) { }

  getPetsForUsers(uId: userId): PetDto[] {
    this.validateUserId(uId);
    return this.petsRepository.getPetsForUser(uId);
  }

  getPet(uId: userId, id: petId): PetDetailedDto {
    return this.mapPetToDetailedPet(this.findPetAndUser(uId, id));
  }

  addPet(uId: userId, create: PetCreateDto): PetDetailedDto {
    const user = this.validateUserId(uId);
    if (uId !== create.userId) {
      throw new BadRequestException();
    }
    const pet = this.petsRepository.addPet(this.mapCreatePetToPet(create));
    return this.mapPetToDetailedPet({ user, pet });
  }

  updatePet(uId: userId, id: petId, update: PetUpdateDto): PetDetailedDto {
    const { pet: toUpdate, user } = this.findPetAndUser(uId, id);
    if (id !== update.id || uId !== update.userId) {
      throw new BadRequestException();
    }
    const pet = this.petsRepository.updatePet(toUpdate, update);
    return this.mapPetToDetailedPet({ user, pet });
  }

  removePet(uId: userId, id: petId): PetDetailedDto {
    const { pet: toRemove, user } = this.findPetAndUser(uId, id);
    const pet =  this.petsRepository.removePet(toRemove);
    return this.mapPetToDetailedPet({ user, pet });
  }

  private mapCreatePetToPet(createPet: PetCreateDto): PetDto {
    return {
      ...createPet,
      id: this.generatePetId(),
    };
  }

  private mapPetToDetailedPet({ pet, user }: PetAndUser): PetDetailedDto {
    return {
      ...pet,
      user,
    };
  }

  private findPetAndUser(uId: userId, id: petId): PetAndUser {
    // 404 if user does not exist
    const user = this.validateUserId(uId);

    // 404 if pet does not exist for user
    const pet = this.petsRepository.getPet(uId, id);
    if (!pet) {
      throw new NotFoundException();
    }

    return {
      pet,
      user,
    };
  }

  private generatePetId(): petId {
    return v4() as any;
  }

  private validateUserId(uId: userId) {
    return this.usersService.getUser(uId);
  }
}
