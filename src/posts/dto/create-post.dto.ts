import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { typePostEnum } from "../../common/enums/typePost";

export class CreatePostDto {    
    
    @IsNumber()
    @IsOptional()
    typePost: number;

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    content: string;
}