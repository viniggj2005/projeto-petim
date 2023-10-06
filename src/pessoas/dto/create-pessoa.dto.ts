import { IsBoolean, IsNotEmpty, IsString } from "class-validator";


export class CreatePessoaDto {
@IsBoolean()
  admin: boolean;
  @IsString()
  cpf: string;
 
  nome: string;
}