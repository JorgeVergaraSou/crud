import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { tipoPublicacionEnum } from "../../common/enums/tipoPublicacion.enum";

export class CreatePostDto {    
    
    @IsEnum(tipoPublicacionEnum) // Valida que el valor sea uno de los miembros del enum
    @IsOptional()
    typePost: tipoPublicacionEnum;

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
