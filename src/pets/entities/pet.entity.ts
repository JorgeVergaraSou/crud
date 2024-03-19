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

    @ManyToOne(() => Breed, { eager: true }) // Relación ManyToOne con Breed, eager carga la relación automáticamente
    breed: Breed;   

    @Column()
    description: string;

    @Column()
    image: string;

    /*
    @ManyToOne(() => User) // Relación ManyToOne con User
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
    user: User;

    @Column()
    userEmail: string;  
*/
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

    @DeleteDateColumn()
    deletedAt: Date;

}