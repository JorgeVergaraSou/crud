import { User } from "../../users/entities/user.entity";
import { Pets } from "../../pets/entities/pet.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { tipoPublicacionEnum } from "../../common/enums/tipoPublicacion.enum";

@Entity()
export class Publishing {
    @PrimaryGeneratedColumn()
    idPublish: number;

    @Column({ type: 'enum', enum: tipoPublicacionEnum })
    tipoPublicacion: tipoPublicacionEnum;

    @Column()
    title: string;

    @Column()
    contenido: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Usa una función para que TypeORM interprete CURRENT_TIMESTAMP como una función de MySQL
    fechaPublicacion: Date;

    /* el many-to-one recibe una funcion de flecha */
    @ManyToOne(() => Pets, (pets) => pets.idPet, {
        eager: true, 
    })
    pet: Pets; 

    @ManyToOne(() => User, (users) => users.id, {
        eager: true, 
    })
    user: User;

    /** con esto le digo que debe usar el campo email como referencia */
    /*
    @ManyToOne(() => User) 
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email', })
    users: User;
*/



    @Column()
    userEmail: string;

}
