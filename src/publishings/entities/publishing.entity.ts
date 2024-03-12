import { Entity } from "typeorm";

@Entity()
export class Publishing {

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