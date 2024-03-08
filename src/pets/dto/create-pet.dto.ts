import { IsString, MinLength, IsInt, IsPositive, IsOptional } from "class-validator";

export class CreatePetDto {
    @IsString() // debe ser string
    @MinLength(3) //el minimo de caracteres admitidos
    namePet: string;
 
     @IsInt() // ES NUMERO ENTERO
     @IsPositive() // SEA POSITIVO
     age: number;
 
     @IsString()
     @IsOptional() // es opcional
     breed?: string;

     @IsString()
     @IsOptional()
     description?: string;

     @IsString()
     @IsOptional()
     image?: string;
}
