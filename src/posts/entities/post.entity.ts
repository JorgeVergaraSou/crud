import { User } from "../../users/entities/user.entity";
import { Pets } from "../../pets/entities/pet.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { typePostEnum } from "../../common/enums/typePost";

@Entity()
export class Posts {
     @PrimaryGeneratedColumn()
     idPost: number;

     @Column({ type: 'enum', enum: typePostEnum })
     typePost: typePostEnum;

     @Column()
     title: string;

     @Column()
     content: string;

     @Column({ default: () => 'CURRENT_TIMESTAMP' })
     postDate: Date;

     @Column({ default: 1 })
     isActive: number;

     @Column({ default: () => 'CURRENT_TIMESTAMP' })
     softDeleteDate: Date;

     @ManyToOne(() => User, (user) => user.posting)
     @JoinColumn({ name: 'userIdFk', referencedColumnName: 'idUser', })
     user: User;

     @Column()
     userIdFk: number;

     // En la entidad Posts
     @OneToMany(() => Pets, pet => pet.post)
     pets: Pets[];


     /*
     @ManyToOne(() => Pets, (pets) => pets.idPet,
          {
               eager: true
          })
     pets: Pets;
*/
}