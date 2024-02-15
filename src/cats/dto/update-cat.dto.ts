import { IsInt, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

/* lo que hace nest es hacer un parcial type del createDto, toma el create y los deja opcionales en el update
el @Patch la estrategia del controlador: podemos hacer modicifaciones parciales no se necesita modificar
todos los campos de la BD, se puede mandar de a 1 */
export class UpdateCatDto {

    @IsString() // debe ser string
    @MinLength(3) //el minimo de caracteres admitidos
    @IsOptional() 
     name?: string;
 
     @IsInt() // ES NUMERO ENTERO
     @IsPositive() // SEA POSITIVO
     @IsOptional() 
     age?: number;
 
     @IsString()
     @IsOptional() // es opcional
     breed?: string; // el signo ? indica que es opcional el recibir esa info
}
