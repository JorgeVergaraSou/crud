import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { PetEnum } from "../../common/enums/pet.enum";
import { Breed } from "../../breeds/entities/breed.entity";
import { User } from "../../users/entities/user.entity";
import { Posts } from "src/posts/entities/post.entity";

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

 

    @Column()
    description: string;

    @Column()
    image: string;

    @Column({ default: 1})
    isActive: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Usa una función para que TypeORM interprete CURRENT_TIMESTAMP como una función de MySQL
    softDeleteDate: Date;

    @ManyToOne(() => User, (user) => user.pet)
    @JoinColumn({ name: 'userIdFk', referencedColumnName: 'idUser', })
    user: User;

    @Column()
    userIdFk: number;

    @ManyToOne(() => Posts, (post) => post.pet)
    @JoinColumn({ name: 'postIdFk', referencedColumnName: 'idPost', })
    post: Posts;

    @Column()
    postIdFk: number;

    @ManyToOne(() => Breed, (breed) => breed.idBreed,
    {
         eager: true 
    }) // Relación ManyToOne con Breed, eager carga la relación automáticamente
    breed: Breed;  

    /**
     *   @ManyToOne(() => Breed, (breed) => breed.id, {
    eager: true, // para que traiga las raza al hacer un findOne
  })
  breed: Breed;
     */
}