import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
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

     @CreateDateColumn({ name: 'created_at' })
     createdAt: Date;
 
     @UpdateDateColumn({ name: 'update_at' })
     updateAt: Date;

     @Column({ default: 1 })
     isActive: number;

     @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Usa una función para que TypeORM interprete CURRENT_TIMESTAMP como una función de MySQL
     softDeleteDate: Date;

     @Column()
     idUser: number;

     @ManyToOne(() => User, (user) => user.pet)
     @JoinColumn({ name: 'idUser', referencedColumnName: 'idUser', })
     user: User;

     // En la entidad Pets
     @ManyToOne(() => Posts, post => post.pets)
     @JoinColumn({ name: 'idPost', referencedColumnName: 'idPost' })
     post: Posts;

     @Column()
     idPost: number;

     @ManyToOne(() => Breed, (breed) => breed.idBreed,
          {
               eager: true
          })
     breed: Breed;

}