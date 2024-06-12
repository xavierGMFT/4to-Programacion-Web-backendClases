import { IsInt, IsString, Min } from "class-validator";

export class ProductDto {
    @IsString({
        message: "El campo nombre debe de ser un String"
    })
    name: string;

    @IsString({
        message: "El campo descripcion debe de ser un string"
    })
    description: string;

    @IsInt({
        message: "El campo stock debe de ser un numero"
    })
    @Min(0, { message: 'El stock debe ser 0 o más'})
    stock: number;
}