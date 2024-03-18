import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { PetEnum } from "../../common/enums/pet.enum";
import { Breed } from "../../breeds/entities/breed.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Pets {

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

    @ManyToOne(() => Breed, { eager: true }) // Relación ManyToOne con Breed, eager carga la relación automáticamente
    breed: Breed;   

    @Column()
    description: string;

    @Column()
    image: string;
    
    @ManyToOne(() => User) // Relación ManyToOne con User
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
    user: User;

    @Column()
    userEmail: string;  

    


}