import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn } from "typeorm";
import { PetEnum } from "../../common/enums/pet.enum";
import { Breed } from "../../breeds/entities/breed.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Pet {

    @PrimaryGeneratedColumn()
    idPet: number;

    @Column()
    namePet: string;
    
    @Column({ type: 'enum', enum: PetEnum })
    pet: PetEnum;

    @Column()
    age: number;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Breed , (breed) => breed.id, {
        // cascade: true,
        eager: true, 
      })
      breed: Breed;   

      @Column()
      description: string;

      @Column()
      image: string;
      
      @ManyToOne( () => User ) /** con esto le digo que debe usar el campo email como referencia */
      @JoinColumn({ name: 'userEmail', referencedColumnName: 'email', })
      user: User;
  
      @Column()
      userEmail: string;  
      


}


