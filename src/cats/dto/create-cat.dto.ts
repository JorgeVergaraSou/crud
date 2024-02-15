/* dto: DATA TRANSFER OBJECT es como mapear la informacion que va llegar, es estar preparado para lo que viene
 solo recbira lo que aca este permitido */

import { IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateCatDto {

   @IsString() // debe ser string
   @MinLength(3) //el minimo de caracteres admitidos
    name: string;

    @IsInt() // ES NUMERO ENTERO
    @IsPositive() // SEA POSITIVO
    age: number;

    @IsString()
    @IsOptional() // es opcional
    breed?: string; // el signo ? indica que es opcional el recibir esa info
}
