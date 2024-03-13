import { Pet } from "../../pets/entities/pet.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Publishing {
    @PrimaryGeneratedColumn()
    idPublish: number;

    @Column()
    title: string;

    @Column()
    contenido: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Usa una función para que TypeORM interprete CURRENT_TIMESTAMP como una función de MySQL
    fechaPublicacion: Date;

    @ManyToOne(() => Pet, pet => pet.publishings) // Relación ManyToOne con Pet
    pet: Pet;
}
/**
 * -- Tabla de Publicaciones
CREATE TABLE Publicaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
    id_mascota INT,
    FOREIGN KEY (id_mascota) REFERENCES Mascotas(id)
);
 */