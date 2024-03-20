import { MinLength } from "class-validator";
import { Column } from "typeorm";

export class CreateBreedDto {

    @Column()
    @MinLength(3)
    nameBreed: string
}