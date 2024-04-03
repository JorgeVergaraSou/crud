import { Column, DeleteDateColumn, Entity, OneToMany } from "typeorm";

@Entity()
export class Breed {

    @Column({ primary: true, generated: true})
    idBreed: number;

    @Column({ length: 50})
    nameBreed: string;

 /*   @DeleteDateColumn()
    deletedAt?: Date;*/

    @Column({ default: 1 })
    isActive: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Usa una función para que TypeORM interprete CURRENT_TIMESTAMP como una función de MySQL
    softDeleteDate: Date;
}
/* se crea la entity para poder hacer la relacion a cats, de parte del breed es one-to-many */
/** EL ONE-TO-MANY SI ESTA EN UNA ENTIDAD NO PUEDE VIVIR SIN EL MANY-TO-ONE EN LA OTRA ENTIDAD 
 * PERO AL REVES SI PUEDE SER QUE EXISTA EL MANY-TO-ONE SIN EL ONE-TO-MANY YA QUE EL MTO ES EL QUE GUARDA 
 * EL DATO EN LA BASE DE DATOS 
 */