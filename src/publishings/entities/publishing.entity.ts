import { User } from "../../users/entities/user.entity";
import { PetEntity } from "../../pets/entities/pet.entity";
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
    @ManyToOne(() => PetEntity, (pets) => pets.idPet, {
        // cascade: true,
        eager: true, // para que traiga las raza al hacer un findOne
    })
    pets: PetEntity; // se le pasa toda la instancia del Breed

    @ManyToOne(() => User) /** con esto le digo que debe usar el campo email como referencia */
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email', })
    user: User;

    @Column()
    userEmail: string;

}
