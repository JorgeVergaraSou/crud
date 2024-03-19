import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { typePostEnum } from "../../common/enums/typePost";

export class CreatePostDto {    
    
    @IsEnum(typePostEnum) // Valida que el valor sea uno de los miembros del enum
    @IsOptional()
    typePost: typePostEnum;

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsDate()
    @IsOptional()
    postDate: Date;
/*
    @IsNumber()
    user_id: number;   
    */
}
