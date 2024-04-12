import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { typePostEnum } from "../../common/enums/typePost";

export class CreatePostDto {    
    
    @IsEnum(typePostEnum) // Valida que el valor sea uno de los miembros del enum
    @IsOptional()
    typePost: typePostEnum;

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    content: string;

    @IsDate()
    @IsOptional()
    postDate: Date;
}