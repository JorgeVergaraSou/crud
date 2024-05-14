import { User } from "../../users/entities/user.entity";
import { Pets } from "../../pets/entities/pet.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, DeleteDateColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { typePostEnum } from "../../common/enums/typePost";

@Entity()
export class Posts {
     @PrimaryGeneratedColumn()
     idPost: number;

     @Column()
     typePost: number;

     @Column()
     title: string;

     @Column()
     content: string;
<<<<<<< HEAD
/*
     @Column({ default: () => 'CURRENT_TIMESTAMP' })
     postDate: Date;
*/
     @CreateDateColumn({ name: 'created_at' })
     createdAt: Date;

=======

     @CreateDateColumn({ name: 'created_at' })
     createdAt: Date;
 
>>>>>>> 4bf5702d2d92b355eb43d9a2fb8f542bfbebeb89
     @UpdateDateColumn({ name: 'update_at' })
     updateAt: Date;

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

}