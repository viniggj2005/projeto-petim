import { IsBoolean, IsNotEmpty, IsString, Validate } from "class-validator";


export class CreatePessoaDto {
  @IsBoolean()
  admin: boolean;

  @IsString()
  cpf: string;
 
  @IsNotEmpty()
  nome: string;
}