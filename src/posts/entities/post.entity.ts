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

    @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Usa una función para que TypeORM interprete CURRENT_TIMESTAMP como una función de MySQL
    postDate: Date;

    @Column({ default: 1})
    isActive: number;

    
    @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Usa una función para que TypeORM interprete CURRENT_TIMESTAMP como una función de MySQL
    softDeleteDate: Date;
/*
    @DeleteDateColumn()
    deleteAt: Date;
*/
    @ManyToOne(() => User, (user) => user.posting)
    @JoinColumn({ name: 'userIdFk', referencedColumnName: 'idUser', })
    user: User;

    @Column()
    userIdFk: number;

    @OneToMany(() => Pets, pet => pet.post)
    pet: Pets[];

}

