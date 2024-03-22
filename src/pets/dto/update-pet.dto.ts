import { IsString, MinLength, IsInt, IsPositive, IsOptional, IsEnum, IsNumber } from "class-validator";

export class UpdatePetDto {
    @IsString() // debe ser string
    @MinLength(3) //el minimo de caracteres admitidos
    @IsOptional()
    namePet: string;

    @IsInt() // ES NUMERO ENTERO
    @IsPositive() // SEA POSITIVO
    @IsOptional()
    age: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    image?: string;

}
