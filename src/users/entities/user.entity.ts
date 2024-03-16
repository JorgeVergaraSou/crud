import { Publishing } from "../../publishings/entities/publishing.entity";
import { Role } from "../../common/enums/role.enum";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pets } from "src/pets/entities/pet.entity";

/** esta entidad es como se va comportar este usuario en la bd, que propiedades y valores va tener */
@Entity()
export class User {

    // @Column({ primary: true, generated: true })
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    /** ES UNICO Y NO PUEDE SER NULO */
    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false, select: false })
    password: string;

    @Column({ type: 'enum', default: Role.USER, enum: Role })
    role: Role;

    @DeleteDateColumn() // SE USA PARA HACER ELIMINACIONES LOGICAS
    deleteAt: Date;
/*
    @OneToMany(() => Publishing, publishing => publishing.user, { cascade: true }) // Relación OneToMany con Publishing, con operaciones en cascada
    publishings: Publishing[]; */

    @OneToMany(() => Pets, pet => pet.user)
    pet: Pets[];

    @OneToMany(() => Publishing, publishing => publishing.idPublish)
    publishings: Publishing[];
}
