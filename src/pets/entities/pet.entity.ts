import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { PetEnum } from "../../common/enums/pet.enum";
import { Breed } from "../../breeds/entities/breed.entity";
import { User } from "../../users/entities/user.entity";
import { Publishing } from "../../publishings/entities/publishing.entity";


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

    @OneToMany( () => Publishing , (publishing) => publishing.pet )
    publishings: Publishing[];

    /**
     *     @OneToMany( () => Cat , (cat) => cat.breed )
    cats: Cat[];
     */

  //  @OneToMany(() => Publishing, publishing => publishing.pets, { cascade: true }) // Relación OneToMany con Publishing, con operaciones en cascada
   // publishings: Publishing[];
}