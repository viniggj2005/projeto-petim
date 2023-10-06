import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateProdutoDto {
    @IsNotEmpty()
    nome:string;
    @IsOptional()
    favorito:boolean;
    @IsNotEmpty()
    descricao:string;
    @IsNotEmpty()
    valor:number;
    cpf:string;
}