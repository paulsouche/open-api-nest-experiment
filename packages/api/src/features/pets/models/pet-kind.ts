import CatMetasDto from './metas/cat-meta.dto';
import DogMetasDto from './metas/dog-meta.dto';
import HamsterMetasDto from './metas/hamster-meta.dto';
import RabbitMetasDto from './metas/rabbit-meta.dto';

const PetKind = {
  Cat: 'Cat',
  Dog: 'Dog',
  Hamster: 'Hamster',
  Rabbit: 'Rabbit',
};

export type PetKindKeys = keyof typeof PetKind;

export const PetKindEnum = Object.keys(PetKind);

export type PetMetas = CatMetasDto | DogMetasDto | HamsterMetasDto | RabbitMetasDto;

export default PetKind;
