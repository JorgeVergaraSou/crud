import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { tipoPublicacionEnum } from "../../common/enums/tipoPublicacion.enum";

export class CreatePublishingDto {    
    
    @IsEnum(tipoPublicacionEnum) // Valida que el valor sea uno de los miembros del enum
    @IsOptional()
    tipoPublicacion: tipoPublicacionEnum;

    @IsString()
    title: string;

    @IsString()
    contenido: string;

    @IsDate()
    @IsOptional()
    fechaPublicacion: Date;

    @IsNumber()
    petsIdPet: number;

    @IsNumber()
    usersId: number;   
    
}

/**
 *     id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
    id_mascota INT,
    FOREIGN KEY (id_mascota) REFERENCES Mascotas(id)
 */
