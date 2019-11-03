import { Injectable } from '@nestjs/common';
import petId from '../models/pets/pet-id';
import PetUpdateDto from '../models/pets/pet-update.dto';
import PetDto from '../models/pets/pet.dto';
import userId from '../models/users/user-id';

// TODO real postgres connection
const pets: PetDto[] = [];

@Injectable()
export default class PetsRepository {

  getPetsForUser(uId: userId): PetDto[] {
    return pets.filter((p) => p.userId === uId);
  }

  getPet(uId: userId, id: petId): PetDto | undefined {
    return pets.find((p) => p.id === id && p.userId === uId);
  }

  addPet(pet: PetDto): PetDto {
    pets.push(pet);
    return pet;
  }

  updatePet(pet: PetDto, update: PetUpdateDto): PetDto {
    pets.splice(this.petIndex(pet), 1, update);
    return update;
  }

  removePet(pet: PetDto): PetDto {
    const [removed] = pets.splice(this.petIndex(pet), 1);
    return removed;
  }

  private petIndex(pet: PetDto): number {
    return pets.findIndex((p) => p === pet);
  }
}
