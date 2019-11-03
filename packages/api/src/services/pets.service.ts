import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import PetCreateDto from '../models/pets/pet-create.dto';
import petId from '../models/pets/pet-id';
import PetUpdateDto from '../models/pets/pet-update.dto';
import PetDto from '../models/pets/pet.dto';
import userId from '../models/users/user-id';
import PetsRepository from '../repositories/pets.repository';
import UsersService from './users.service';

@Injectable()
export default class PetsService {

  constructor(private readonly usersService: UsersService, private readonly petsRepository: PetsRepository) { }

  getPetsForUsers(uId: userId): PetDto[] {
    this.validateUserId(uId);
    return this.petsRepository.getPetsForUser(uId);
  }

  getPet(uId: userId, id: petId): PetDto {
    return this.findPet(uId, id);
  }

  addPet(uId: userId, pet: PetCreateDto): PetDto {
    this.validateUserId(uId);
    if (uId !== pet.userId) {
      throw new BadRequestException();
    }
    return this.petsRepository.addPet(this.mapCreatePetToPet(pet));
  }

  updatePet(uId: userId, id: petId, update: PetUpdateDto): PetDto {
    const pet = this.findPet(uId, id);
    if (id !== update.id || uId !== update.userId) {
      throw new BadRequestException();
    }
    return this.petsRepository.updatePet(pet, update);
  }

  removePet(uId: userId, id: petId): PetDto {
    return this.petsRepository.removePet(this.findPet(uId, id));
  }

  private mapCreatePetToPet(createPet: PetCreateDto): PetDto {
    return {
      ...createPet,
      id: this.generatePetId(),
    };
  }

  private findPet(uId: userId, id: petId): PetDto {
    // 404 if user does not exist
    this.validateUserId(uId);

    // 404 if pet does not exist for user
    const pet = this.petsRepository.getPet(uId, id);
    if (!pet) {
      throw new NotFoundException();
    }

    return pet;
  }

  private generatePetId(): petId {
    return v4() as any;
  }

  private validateUserId(uId: userId) {
    this.usersService.getUser(uId);
  }
}
