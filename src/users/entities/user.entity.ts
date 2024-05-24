import { Role } from "../../common/enums/role.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Pets } from "src/pets/entities/pet.entity";
import { Posts } from "src/posts/entities/post.entity";

/** esta entidad es como se va comportar este usuario en la bd, que propiedades y valores va tener */
@Entity()
export class User {

    // @Column({ primary: true, generated: true })
    @PrimaryGeneratedColumn()
    idUser: number;

    @Column({ length: 50 })
    name: string;

    /** ES UNICO Y NO PUEDE SER NULO */
    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false, select: false })
    password: string;

    @Column({ type: 'enum', default: Role.USER, enum: Role })
    role: Role;

    @Column({ default: 1})
    isActive: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Usa una función para que TypeORM interprete CURRENT_TIMESTAMP como una función de MySQL
    softDeleteDate: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updateAt: Date;
/*
    @DeleteDateColumn() // SE USA PARA HACER ELIMINACIONES LOGICAS
    deleteAt: Date;
*/
    @OneToMany(() => Pets, pet => pet.user)
    pet: Pets[];

    @OneToMany(() => Posts, (post) => post.user)
    posting: Posts[];
}
